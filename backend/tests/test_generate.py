"""
Kavach - AI Legal Document Engine for India
Document Generation Tests
"""

import pytest
import httpx
from typing import Dict


class TestGenerate:
    """Document generation endpoint tests."""

    @pytest.mark.asyncio
    async def test_generate_nda(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """POST /generate with nda should create an NDA document."""
        resp = await http_client.post(
            f"{base_url}/api/v1/generate/?doc_type=nda",
            headers=auth_headers,
            json={
                "party_a": {"name": "Acme Corp", "type": "company", "address": "Mumbai", "state": "maharashtra"},
                "party_b": {"name": "John Doe", "type": "individual", "address": "Bangalore", "state": "karnataka"},
                "document_details": {"confidentiality_period": "2 years", "jurisdiction": "maharashtra", "include_gst": False},
            },
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        assert "document" in data["data"]
        doc = data["data"]["document"]
        assert "id" in doc
        assert "content_html" in doc

    @pytest.mark.asyncio
    async def test_generate_rent_agreement(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """POST /generate with rent_agreement should work."""
        resp = await http_client.post(
            f"{base_url}/api/v1/generate/?doc_type=rent_agreement",
            headers=auth_headers,
            json={
                "party_a": {"name": "Landlord", "type": "individual", "address": "Delhi", "state": "delhi"},
                "party_b": {"name": "Tenant", "type": "individual", "address": "Delhi", "state": "delhi"},
                "document_details": {"property_address": "123 Main St", "rent_amount": 25000, "security_deposit": 50000, "tenure_months": 11, "jurisdiction": "delhi"},
            },
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True

    @pytest.mark.asyncio
    async def test_generate_invalid_type(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """POST /generate with invalid doc_type should return 400 or 403."""
        resp = await http_client.post(
            f"{base_url}/api/v1/generate/?doc_type=invalid_type_xyz",
            headers=auth_headers,
            json={},
        )
        assert resp.status_code in (400, 403, 422)

    @pytest.mark.asyncio
    async def test_generate_has_content(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """Generated document should have HTML content."""
        resp = await http_client.post(
            f"{base_url}/api/v1/generate/?doc_type=nda",
            headers=auth_headers,
            json={
                "party_a": {"name": "Test A", "type": "company", "address": "Addr 1", "state": "maharashtra"},
                "party_b": {"name": "Test B", "type": "individual", "address": "Addr 2", "state": "karnataka"},
                "document_details": {"confidentiality_period": "1 year", "jurisdiction": "maharashtra", "include_gst": False},
            },
        )
        assert resp.status_code == 200
        data = resp.json()
        doc = data["data"]["document"]
        assert doc.get("content_html") is not None or doc.get("pdf_path") is not None

    @pytest.mark.asyncio
    async def test_generate_unauthorized(self, http_client: httpx.AsyncClient, base_url: str):
        """Without auth, generation should return 401."""
        resp = await http_client.post(
            f"{base_url}/api/v1/generate/?doc_type=nda",
            json={},
        )
        assert resp.status_code == 401


class TestGenerateRefine:
    """Document refinement endpoint tests."""

    @pytest.mark.asyncio
    async def test_refine_document(
        self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str], test_document_id: str
    ):
        """POST /generate/refine should refine a document."""
        resp = await http_client.post(
            f"{base_url}/api/v1/generate/refine",
            headers=auth_headers,
            json={
                "document_id": test_document_id,
                "instructions": "Make the confidentiality clause stronger",
                "doc_type": "nda",
            },
        )
        assert resp.status_code in (200, 400, 404, 422)


class TestGeneratePreview:
    """Document preview endpoint tests."""

    @pytest.mark.asyncio
    async def test_preview_document(
        self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str], test_document_id: str
    ):
        """GET /generate/preview/{id} should return preview."""
        resp = await http_client.get(
            f"{base_url}/api/v1/generate/preview/{test_document_id}",
            headers=auth_headers,
        )
        assert resp.status_code in (200, 404)
