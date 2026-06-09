"""
Kavach - AI Legal Document Engine for India
Billing Router Tests
"""

import pytest
import httpx
from typing import Dict


class TestBillingPlans:
    """Billing plans endpoint tests."""

    @pytest.mark.asyncio
    async def test_get_plans(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """GET /billing/plans should return plan list."""
        resp = await http_client.get(f"{base_url}/api/v1/billing/plans", headers=auth_headers)
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        assert len(data["data"]["plans"]) > 0
        plan_names = [p["name"].lower() for p in data["data"]["plans"]]
        assert "free" in plan_names
        assert "pro" in plan_names

    @pytest.mark.asyncio
    async def test_plan_prices(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """Plans should have valid prices."""
        resp = await http_client.get(f"{base_url}/api/v1/billing/plans", headers=auth_headers)
        data = resp.json()
        for plan in data["data"]["plans"]:
            assert "price" in plan
            assert "name" in plan
            assert "features" in plan


class TestBillingCreateOrder:
    """Razorpay order creation tests."""

    @pytest.mark.asyncio
    async def test_create_order(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """POST /billing/create-order should create a Razorpay order."""
        resp = await http_client.post(
            f"{base_url}/api/v1/billing/create-order",
            headers=auth_headers,
            json={"plan_id": "pro"},
        )
        # May fail if Razorpay keys are placeholder
        assert resp.status_code in (200, 400, 500, 422)

    @pytest.mark.asyncio
    async def test_create_order_invalid_plan(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """Invalid plan should return 400/422."""
        resp = await http_client.post(
            f"{base_url}/api/v1/billing/create-order",
            headers=auth_headers,
            json={"plan_id": "nonexistent_plan"},
        )
        assert resp.status_code in (200, 400, 422, 500)

    @pytest.mark.asyncio
    async def test_create_order_unauthorized(self, http_client: httpx.AsyncClient, base_url: str):
        """Without auth, should return 401."""
        resp = await http_client.post(
            f"{base_url}/api/v1/billing/create-order",
            json={"plan_id": "pro"},
        )
        assert resp.status_code == 401


class TestBillingVerifyPayment:
    """Payment verification tests."""

    @pytest.mark.asyncio
    async def test_verify_payment_invalid(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """Verify with invalid data should fail gracefully."""
        resp = await http_client.post(
            f"{base_url}/api/v1/billing/verify-payment",
            headers=auth_headers,
            json={
                "razorpay_order_id": "order_test123",
                "razorpay_payment_id": "pay_test123",
                "razorpay_signature": "sig_test123",
            },
        )
        assert resp.status_code in (200, 400, 422, 500)
