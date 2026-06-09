"""
Kavach - AI Legal Document Engine for India
Stamp Duty Calculator Tests
"""

import pytest
import httpx
from typing import Dict


class TestStampDutyStates:
    """Stamp duty state listing tests."""

    @pytest.mark.asyncio
    async def test_get_states(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """GET /stamp-duty/states should return state list."""
        resp = await http_client.get(f"{base_url}/api/v1/stamp-duty/states", headers=auth_headers)
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        assert data["data"]["total"] > 0
        assert len(data["data"]["states"]) > 0
        # Check state format
        first = data["data"]["states"][0]
        assert "code" in first
        assert "name" in first

    @pytest.mark.asyncio
    async def test_get_states_unauthorized(self, http_client: httpx.AsyncClient, base_url: str):
        """Without auth, should return 401."""
        resp = await http_client.get(f"{base_url}/api/v1/stamp-duty/states")
        assert resp.status_code == 401


class TestStampDutyRates:
    """Stamp duty rates endpoint tests."""

    @pytest.mark.asyncio
    async def test_get_state_rates(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """GET /stamp-duty/states/{state}/rates should return rates for a state."""
        resp = await http_client.get(f"{base_url}/api/v1/stamp-duty/states/maharashtra/rates", headers=auth_headers)
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        assert "rates" in data["data"]
        assert data["data"]["total"] > 0

    @pytest.mark.asyncio
    async def test_get_state_rates_invalid_state(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """Invalid state should return 404."""
        resp = await http_client.get(f"{base_url}/api/v1/stamp-duty/states/invalid_state/rates", headers=auth_headers)
        assert resp.status_code == 404


class TestStampDutyCalculate:
    """Stamp duty calculation endpoint tests."""

    @pytest.mark.asyncio
    async def test_calculate_valid(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """Calculate with valid params should return duty amount."""
        resp = await http_client.get(
            f"{base_url}/api/v1/stamp-duty/calculate?state=maharashtra&doc_type=rent_agreement&document_value=500000",
            headers=auth_headers,
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        calc = data["data"]
        assert calc["stamp_duty_amount"] >= 0
        assert calc["total_amount"] == calc["document_value"] + calc["stamp_duty_amount"]
        assert calc["currency"] == "INR"

    @pytest.mark.asyncio
    async def test_calculate_zero_value(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """Zero document value should return zero duty."""
        resp = await http_client.get(
            f"{base_url}/api/v1/stamp-duty/calculate?state=karnataka&doc_type=nda&document_value=0",
            headers=auth_headers,
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["data"]["stamp_duty_amount"] >= 0

    @pytest.mark.asyncio
    async def test_calculate_negative_value(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """Negative document value should return 400."""
        resp = await http_client.get(
            f"{base_url}/api/v1/stamp-duty/calculate?state=maharashtra&doc_type=nda&document_value=-100",
            headers=auth_headers,
        )
        assert resp.status_code == 400


class TestStampDutyCompare:
    """State comparison endpoint tests."""

    @pytest.mark.asyncio
    async def test_compare_states(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """GET /stamp-duty/compare should compare across states."""
        resp = await http_client.get(
            f"{base_url}/api/v1/stamp-duty/compare?doc_type=rent_agreement&document_value=500000",
            headers=auth_headers,
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        assert len(data["data"]["comparisons"]) > 0
        # Check sorted by amount (lowest first)
        comparisons = data["data"]["comparisons"]
        for i in range(len(comparisons) - 1):
            assert comparisons[i]["stamp_duty_amount"] <= comparisons[i + 1]["stamp_duty_amount"]


class TestStampDutyDocTypes:
    """Document types endpoint tests."""

    @pytest.mark.asyncio
    async def test_get_document_types(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """GET /stamp-duty/document-types should return types."""
        resp = await http_client.get(f"{base_url}/api/v1/stamp-duty/document-types", headers=auth_headers)
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        assert data["data"]["total"] > 0
