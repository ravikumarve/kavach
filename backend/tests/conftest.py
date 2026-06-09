"""
Kavach - AI Legal Document Engine for India
Pytest Shared Fixtures and Configuration
"""

import pytest
import httpx
from typing import Dict, Any, Generator

BASE_URL = "http://localhost:8000"

# Test user credentials
TEST_USER = {
    "email": "pytest@kavach.dev",
    "password": "TestPass123!",
    "full_name": "Pytest User",
    "company_name": "Pytest Corp",
}


@pytest.fixture(scope="session")
def base_url() -> str:
    """Return the base API URL."""
    return BASE_URL


@pytest.fixture(scope="session")
def event_loop():
    """Create a single event loop for the test session."""
    import asyncio
    loop = asyncio.new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(scope="session")
async def http_client() -> httpx.AsyncClient:
    """Create an HTTP client for the test session."""
    async with httpx.AsyncClient(timeout=60.0) as client:
        yield client


@pytest.fixture(scope="session")
async def auth_token(http_client: httpx.AsyncClient, base_url: str) -> str:
    """Register a test user and return the auth token."""
    # Try to register
    resp = await http_client.post(
        f"{base_url}/api/v1/auth/register",
        json=TEST_USER,
    )
    if resp.status_code == 200:
        data = resp.json()
        return data["data"]["access_token"]

    # If already exists, login
    resp = await http_client.post(
        f"{base_url}/api/v1/auth/login",
        json={
            "email": TEST_USER["email"],
            "password": TEST_USER["password"],
        },
    )
    assert resp.status_code == 200, f"Login failed: {resp.text}"
    data = resp.json()
    return data["data"]["access_token"]


@pytest.fixture(scope="session")
def auth_headers(auth_token: str) -> Dict[str, str]:
    """Return headers with auth token."""
    return {
        "Authorization": f"Bearer {auth_token}",
        "Content-Type": "application/json",
    }


@pytest.fixture(scope="session")
async def test_document_id(
    http_client: httpx.AsyncClient, base_url: str, auth_headers: Dict[str, str]
) -> str:
    """Create a test document via AI generation and return its ID."""
    # First, try to delete existing documents to free quota
    list_resp = await http_client.get(f"{base_url}/api/v1/documents/", headers=auth_headers)
    if list_resp.status_code == 200:
        docs = list_resp.json().get("data", {}).get("documents", [])
        for doc in docs:
            await http_client.delete(f"{base_url}/api/v1/documents/{doc['id']}", headers=auth_headers)

    # Create a new document
    resp = await http_client.post(
        f"{base_url}/api/v1/generate/?doc_type=nda",
        headers=auth_headers,
        json={
            "party_a": {"name": "Test Party A", "type": "company", "address": "Addr 1", "state": "maharashtra"},
            "party_b": {"name": "Test Party B", "type": "individual", "address": "Addr 2", "state": "karnataka"},
            "document_details": {"confidentiality_period": "2 years", "jurisdiction": "maharashtra", "include_gst": False},
        },
    )

    # Fallback: try minimal payload
    if resp.status_code != 200:
        resp = await http_client.post(
            f"{base_url}/api/v1/generate/?doc_type=nda",
            headers=auth_headers,
            json={},
        )

    assert resp.status_code == 200, f"Document creation failed ({resp.status_code}): {resp.text[:300]}"
    data = resp.json()
    return data["data"]["document"]["id"]
