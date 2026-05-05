"""
Kavach - AI Legal Document Engine for India
Billing Router
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Dict, Any

from database import get_db
from models import User
from routers.auth import get_current_user


# Create router
router = APIRouter()


@router.post("/create-order", response_model=Dict[str, Any])
async def create_order(
    plan: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    Create a Razorpay order for plan upgrade.
    """
    # TODO: Implement Razorpay order creation
    return {
        "success": True,
        "data": {
            "message": "Order creation endpoint - to be implemented",
            "plan": plan
        }
    }


@router.post("/verify-payment", response_model=Dict[str, Any])
async def verify_payment(
    razorpay_order_id: str,
    razorpay_payment_id: str,
    razorpay_signature: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    Verify Razorpay payment and activate subscription.
    """
    # TODO: Implement payment verification
    return {
        "success": True,
        "data": {
            "message": "Payment verification endpoint - to be implemented",
            "razorpay_order_id": razorpay_order_id
        }
    }


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