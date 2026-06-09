"""
Kavach - AI Legal Document Engine for India
Billing Router - Razorpay Integration
"""

from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import Dict, Any
import razorpay
import hmac
import hashlib
import uuid
from datetime import datetime, timedelta

from database import get_db
from models import User, Subscription, SubscriptionStatusEnum, PlanEnum
from routers.auth import get_current_user
from config import settings


# Create router
router = APIRouter()

# Razorpay client
razorpay_client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_SECRET)
)

# Plan pricing mapping (amount in paise)
PLAN_PRICES = {
    "starter": 74900,    # ₹749
    "pro": 149900,       # ₹1,499
    "agency": 399900,    # ₹3,999
}

PLAN_DOCUMENT_LIMITS = {
    "starter": 20,
    "pro": -1,   # unlimited
    "agency": -1,  # unlimited
}


@router.post("/create-order", response_model=Dict[str, Any])
async def create_order(
    plan: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    Create a Razorpay order for plan upgrade.
    """
    try:
        # Validate plan
        if plan not in PLAN_PRICES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid plan: {plan}. Choose from: {', '.join(PLAN_PRICES.keys())}"
            )

        # Check if already on this plan
        existing_sub = db.query(Subscription).filter(
            Subscription.user_id == current_user.id,
            Subscription.status == SubscriptionStatusEnum.ACTIVE
        ).first()

        if existing_sub and existing_sub.plan.value == plan:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"You are already on the {plan} plan"
            )

        amount = PLAN_PRICES[plan]
        currency = "INR"

        # Create Razorpay order
        order_data = {
            "amount": amount,
            "currency": currency,
            "receipt": f"kavach_{current_user.id}_{int(datetime.utcnow().timestamp())}",
            "notes": {
                "user_id": str(current_user.id),
                "plan": plan,
                "email": current_user.email
            }
        }

        order = razorpay_client.order.create(order_data)

        return {
            "success": True,
            "data": {
                "order_id": order["id"],
                "amount": order["amount"],
                "currency": order["currency"],
                "key_id": settings.RAZORPAY_KEY_ID,
                "plan": plan,
                "user_name": current_user.full_name or current_user.email,
                "user_email": current_user.email
            }
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create order: {str(e)}"
        )


@router.post("/verify-payment", response_model=Dict[str, Any])
async def verify_payment(
    razorpay_order_id: str,
    razorpay_payment_id: str,
    razorpay_signature: str,
    plan: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    Verify Razorpay payment and activate subscription.
    """
    try:
        # Verify signature
        expected_signature = hmac.new(
            settings.RAZORPAY_SECRET.encode(),
            f"{razorpay_order_id}|{razorpay_payment_id}".encode(),
            hashlib.sha256
        ).hexdigest()

        if expected_signature != razorpay_signature:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid payment signature"
            )

        # Deactivate any existing active subscriptions
        db.query(Subscription).filter(
            Subscription.user_id == current_user.id,
            Subscription.status == SubscriptionStatusEnum.ACTIVE
        ).update({"status": SubscriptionStatusEnum.EXPIRED})

        # Create new subscription
        subscription = Subscription(
            user_id=current_user.id,
            plan=PlanEnum(plan),
            razorpay_sub_id=razorpay_order_id,
            status=SubscriptionStatusEnum.ACTIVE,
            expires_at=datetime.utcnow() + timedelta(days=30),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        db.add(subscription)

        # Update user plan
        current_user.plan = plan
        current_user.documents_used_this_month = 0

        db.commit()

        return {
            "success": True,
            "data": {
                "message": "Payment verified and subscription activated",
                "plan": plan,
                "expires_at": subscription.expires_at.isoformat()
            }
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Payment verification failed: {str(e)}"
        )


@router.post("/webhook", response_model=Dict[str, Any])
async def razorpay_webhook(request: Request, db: Session = Depends(get_db)):
    """
    Handle Razorpay webhooks (payment.captured, subscription.charged, etc.)
    """
    try:
        payload = await request.body()
        signature = request.headers.get("x-razorpay-signature", "")

        # Verify webhook signature
        expected_signature = hmac.new(
            settings.RAZORPAY_WEBHOOK_SECRET.encode(),
            payload,
            hashlib.sha256
        ).hexdigest()

        if expected_signature != signature:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid webhook signature"
            )

        event = await request.json()
        event_type = event.get("event", "")

        if event_type == "payment.captured":
            payment = event.get("payload", {}).get("payment", {}).get("entity", {})
            order_id = payment.get("order_id")
            notes = payment.get("notes", {})

            # Find subscription by order ID and activate it
            subscription = db.query(Subscription).filter(
                Subscription.razorpay_sub_id == order_id
            ).first()

            if subscription:
                subscription.status = SubscriptionStatusEnum.ACTIVE
                subscription.updated_at = datetime.utcnow()
                db.commit()

        return {"success": True, "status": "received"}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Webhook processing failed: {str(e)}"
        )


@router.get("/plans", response_model=Dict[str, Any])
async def get_plans(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    Get available subscription plans.
    """
    plans = [
        {
            "id": "free",
            "name": "Free",
            "price": 0,
            "currency": "INR",
            "documents_per_month": 3,
            "features": [
                "3 documents per month",
                "Basic document types",
                "PDF export only",
                "Email support"
            ]
        },
        {
            "id": "starter",
            "name": "Starter",
            "price": 749,
            "currency": "INR",
            "documents_per_month": 20,
            "features": [
                "20 documents per month",
                "All document types",
                "PDF + DOCX export",
                "GST clauses",
                "Priority support"
            ]
        },
        {
            "id": "pro",
            "name": "Pro",
            "price": 1499,
            "currency": "INR",
            "documents_per_month": -1,
            "features": [
                "Unlimited documents",
                "All document types",
                "PDF + DOCX export",
                "GST clauses",
                "Clause editor",
                "Stamp duty calculator",
                "Priority support"
            ]
        },
        {
            "id": "agency",
            "name": "Agency",
            "price": 3999,
            "currency": "INR",
            "documents_per_month": -1,
            "features": [
                "Unlimited documents",
                "All document types",
                "PDF + DOCX export",
                "GST clauses",
                "Clause editor",
                "Stamp duty calculator",
                "White-label",
                "Client accounts",
                "API access",
                "Dedicated support"
            ]
        }
    ]
    
    return {
        "success": True,
        "data": {
            "plans": plans
        }
    }
