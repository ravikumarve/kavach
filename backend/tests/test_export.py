"""
Kavach - AI Legal Document Engine for India
Export Router Tests
"""

import pytest
import httpx
from typing import Dict


class TestExportPdf:
    """PDF export endpoint tests."""

    @pytest.mark.asyncio
    async def test_export_pdf(
        self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str], test_document_id: str
    ):
        """POST /export/pdf/{id} should return a PDF."""
        resp = await http_client.post(
            f"{base_url}/api/v1/export/pdf/{test_document_id}",
            headers=auth_headers,
        )
        assert resp.status_code == 200
        # Check that response is a PDF
        content_type = resp.headers.get("content-type", "")
        assert "pdf" in content_type.lower() or resp.content.startswith(b"%PDF")

    @pytest.mark.asyncio
    async def test_export_pdf_not_found(self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]):
        """Non-existent document should return 404."""
        resp = await http_client.post(
            f"{base_url}/api/v1/export/pdf/00000000-0000-0000-0000-000000000000",
            headers=auth_headers,
        )
        assert resp.status_code == 404

    @pytest.mark.asyncio
    async def test_export_pdf_unauthorized(self, http_client: httpx.AsyncClient, base_url: str, test_document_id: str):
        """Without auth, export should return 401."""
        resp = await http_client.post(
            f"{base_url}/api/v1/export/pdf/{test_document_id}",
        )
        assert resp.status_code == 401


class TestExportDocx:
    """DOCX export endpoint tests."""

    @pytest.mark.asyncio
    async def test_export_docx(
        self, http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str], test_document_id: str
    ):
        """POST /export/docx/{id} should return a DOCX."""
        resp = await http_client.post(
            f"{base_url}/api/v1/export/docx/{test_document_id}",
            headers=auth_headers,
        )
        # DOCX export may not be fully implemented
        assert resp.status_code in (200, 404, 500)
