"""
Kavach - AI Legal Document Engine for India
Simple Test Script for Public Endpoints
"""

import asyncio
import httpx


async def test_public_endpoints():
    """Test public endpoints that don't require authentication"""

    base_url = "http://localhost:8000"
    async with httpx.AsyncClient(timeout=30.0) as client:

        print("\n" + "="*60)
        print("🧪 Kavach API Public Endpoints Test")
        print("="*60 + "\n")

        # Test health check
        print("📋 Testing Health Check:")
        print("-" * 60)
        try:
            response = await client.get(f"{base_url}/health")
            print(f"✅ Health Check: {response.status_code}")
            print(f"   Response: {response.json()}")
        except Exception as e:
            print(f"❌ Health Check failed: {str(e)}")
        print()

        # Test root endpoint
        print("📋 Testing Root Endpoint:")
        print("-" * 60)
        try:
            response = await client.get(f"{base_url}/")
            print(f"✅ Root Endpoint: {response.status_code}")
            print(f"   Response: {response.json()}")
        except Exception as e:
            print(f"❌ Root Endpoint failed: {str(e)}")
        print()

        # Test API docs
        print("📋 Testing API Docs:")
        print("-" * 60)
        try:
            response = await client.get(f"{base_url}/docs")
            print(f"✅ API Docs: {response.status_code}")
        except Exception as e:
            print(f"❌ API Docs failed: {str(e)}")
        print()

        print("="*60)
        print("✅ Public endpoints test completed")
        print("="*60 + "\n")


async def test_authenticated_endpoints():
    """Test endpoints that require authentication (placeholder)"""

    print("\n" + "="*60)
    print("🔐 Authenticated Endpoints Test")
    print("="*60 + "\n")
    print("⚠️  Authentication required for these endpoints:")
    print("   - /api/v1/stamp-duty/*")
    print("   - /api/v1/clauses/*")
    print("   - /api/v1/documents/*")
    print("   - /api/v1/generate/*")
    print("   - /api/v1/export/*")
    print("\n   To test these endpoints, you need to:")
    print("   1. Register a user account")
    print("   2. Login to get an authentication token")
    print("   3. Include the token in the Authorization header")
    print("="*60 + "\n")


async def main():
    """Main test function"""
    await test_public_endpoints()
    await test_authenticated_endpoints()


if __name__ == "__main__":
    asyncio.run(main())
