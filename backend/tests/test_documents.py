"""
Kavach - AI Legal Document Engine for India
Document Router Tests
"""

import pytest
import httpx
from typing import Dict


class TestDocumentList:
    """Document listing tests."""

    @pytest.mark.asyncio
    async def test_list_documents(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """GET /documents should return document list."""
        resp = await http_client.get(f"{base_url}/api/v1/documents/", headers=auth_headers)
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True

    @pytest.mark.asyncio
    async def test_list_documents_unauthorized(self, http_client: httpx.AsyncClient, base_url: str):
        """Without auth, should return 401."""
        resp = await http_client.get(f"{base_url}/api/v1/documents/")
        assert resp.status_code == 401


class TestDocumentDetail:
    """Document detail endpoint tests."""

    @pytest.mark.asyncio
    async def test_get_document_detail(
        self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str], test_document_id: str
    ):
        """GET /documents/{id} should return document details."""
        resp = await http_client.get(f"{base_url}/api/v1/documents/{test_document_id}", headers=auth_headers)
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        assert data["data"]["document"]["id"] == test_document_id

    @pytest.mark.asyncio
    async def test_get_document_not_found(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """Non-existent document should return 404."""
        resp = await http_client.get(
            f"{base_url}/api/v1/documents/00000000-0000-0000-0000-000000000000",
            headers=auth_headers,
        )
        assert resp.status_code == 404


class TestDocumentDelete:
    """Document deletion tests."""

    @pytest.mark.asyncio
    async def test_delete_document(
        self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]
    ):
        """DELETE /documents/{id} should delete the document."""
        # Create a document specifically for deletion
        resp = await http_client.post(
            f"{base_url}/api/v1/generate/?doc_type=nda",
            headers=auth_headers,
            json={"title": "Doc to delete", "party_a": {"name": "Test"}},
        )
        assert resp.status_code == 200
        delete_id = resp.json()["data"]["document"]["id"]
        # Now delete it
        resp = await http_client.delete(f"{base_url}/api/v1/documents/{delete_id}", headers=auth_headers)
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
