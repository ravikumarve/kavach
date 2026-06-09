"""
Kavach - AI Legal Document Engine for India
Clause Library Tests
"""

import pytest
import httpx
from typing import Dict

# Real clause types from the library
REAL_CLAUSE_TYPE = "gst_forward_charge"
CUSTOM_CLAUSE_HTML = "<p>This is a test custom clause content for testing purposes.</p>"


class TestClauseLibrary:
    """Clause library browse tests."""

    @pytest.mark.asyncio
    async def test_get_all_clauses(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """GET /clauses/library should return all clauses."""
        resp = await http_client.get(f"{base_url}/api/v1/clauses/library", headers=auth_headers)
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        assert data["data"]["total"] > 0
        assert len(data["data"]["clauses"]) > 0

    @pytest.mark.asyncio
    async def test_get_clause_by_type(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """GET /clauses/library/{type} should return a specific clause."""
        resp = await http_client.get(
            f"{base_url}/api/v1/clauses/library/{REAL_CLAUSE_TYPE}",
            headers=auth_headers,
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        assert "content" in data["data"]

    @pytest.mark.asyncio
    async def test_get_clause_not_found(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """Non-existent clause type should return 404."""
        resp = await http_client.get(
            f"{base_url}/api/v1/clauses/library/nonexistent_clause_xyz",
            headers=auth_headers,
        )
        assert resp.status_code == 404


class TestRecommendedClauses:
    """Recommended clauses endpoint tests."""

    @pytest.mark.asyncio
    async def test_get_recommended_nda(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """GET /clauses/recommended/nda should return NDA clauses."""
        resp = await http_client.get(f"{base_url}/api/v1/clauses/recommended/nda", headers=auth_headers)
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        assert data["data"]["doc_type"] == "nda"

    @pytest.mark.asyncio
    async def test_get_recommended_rent(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """GET /clauses/recommended/rent_agreement should work."""
        resp = await http_client.get(f"{base_url}/api/v1/clauses/recommended/rent_agreement", headers=auth_headers)
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True


class TestGstClause:
    """GST clause endpoint tests."""

    @pytest.mark.asyncio
    async def test_get_gst_taxable(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """GET /clauses/gst taxable should return a GST clause."""
        resp = await http_client.get(
            f"{base_url}/api/v1/clauses/gst?is_taxable=true&is_reverse_charge=false",
            headers=auth_headers,
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        assert data["data"]["is_taxable"] is True
        assert "content" in data["data"]

    @pytest.mark.asyncio
    async def test_get_gst_reverse_charge(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """GET /clauses/gst with reverse charge should work."""
        resp = await http_client.get(
            f"{base_url}/api/v1/clauses/gst?is_taxable=true&is_reverse_charge=true",
            headers=auth_headers,
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        assert data["data"]["is_reverse_charge"] is True

    @pytest.mark.asyncio
    async def test_get_gst_not_taxable(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """GET /clauses/gst not taxable should work."""
        resp = await http_client.get(
            f"{base_url}/api/v1/clauses/gst?is_taxable=false",
            headers=auth_headers,
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        assert data["data"]["is_taxable"] is False


class TestDocumentClauses:
    """Document clause management tests."""

    @pytest.mark.asyncio
    async def test_add_clause_to_document(
        self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str], test_document_id: str
    ):
        """POST /clauses/document/{id}/add should add a clause."""
        resp = await http_client.post(
            f"{base_url}/api/v1/clauses/document/{test_document_id}/add",
            headers=auth_headers,
            params={"clause_type": REAL_CLAUSE_TYPE},
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        assert "content_html" in data["data"]

    @pytest.mark.asyncio
    async def test_add_custom_clause(
        self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str], test_document_id: str
    ):
        """POST /clauses/document/{id}/custom should add a custom clause."""
        resp = await http_client.post(
            f"{base_url}/api/v1/clauses/document/{test_document_id}/custom",
            headers=auth_headers,
            params={
                "clause_title": "Test Custom Clause",
                "clause_content": CUSTOM_CLAUSE_HTML,
            },
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
