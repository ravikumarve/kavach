"""
Kavach - AI Legal Document Engine for India
End-to-End Test with Authentication
"""

import asyncio
import httpx
import json
from typing import Dict, Any, Optional


class KavachE2ETester:
    """End-to-end test class with authentication"""

    def __init__(self, base_url: str = "http://localhost:8000"):
        self.base_url = base_url
        self.client = httpx.AsyncClient(timeout=300.0)
        self.auth_token = None
        self.user_data = None
        self.test_document_id = None

    async def register_user(self) -> bool:
        """Register a test user"""
        try:
            response = await self.client.post(
                f"{self.base_url}/api/v1/auth/register",
                json={
                    "email": "testuser@kavach.com",
                    "password": "Test123!",
                    "full_name": "Test User",
                    "company_name": "Test Company"
                }
            )
            print(f"✅ Register User: {response.status_code}")
            if response.status_code == 200:
                self.user_data = response.json()
                user_id = self.user_data.get("data", {}).get("user", {}).get("id")
                print(f"   User ID: {user_id}")
                return True
            else:
                print(f"   Error: {response.text}")
                return False
        except Exception as e:
            print(f"❌ Register User failed: {str(e)}")
            return False

    async def login_user(self) -> bool:
        """Login and get auth token"""
        try:
            response = await self.client.post(
                f"{self.base_url}/api/v1/auth/login",
                json={
                    "email": "testuser@kavach.com",
                    "password": "Test123!"
                }
            )
            print(f"✅ Login User: {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                self.auth_token = data.get("data", {}).get("access_token")
                print(f"   Auth Token: {self.auth_token[:20] if self.auth_token else 'None'}...")
                return True
            else:
                print(f"   Error: {response.text}")
                return False
        except Exception as e:
            print(f"❌ Login User failed: {str(e)}")
            return False

    async def get_current_user(self) -> bool:
        """Get current user info"""
        try:
            response = await self.client.get(
                f"{self.base_url}/api/v1/auth/me",
                headers={"Authorization": f"Bearer {self.auth_token}"}
            )
            print(f"✅ Get Current User: {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                user = data.get("data", {}).get("user", {})
                print(f"   User: {user.get('full_name')}")
                return True
            else:
                print(f"   Error: {response.text}")
                return False
        except Exception as e:
            print(f"❌ Get Current User failed: {str(e)}")
            return False

    async def test_get_all_states(self) -> bool:
        """Test get all states with authentication"""
        try:
            response = await self.client.get(
                f"{self.base_url}/api/v1/stamp-duty/states",
                headers={"Authorization": f"Bearer {self.auth_token}"}
            )
            print(f"✅ Get All States (Auth): {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                print(f"   Total states: {data['data']['total']}")
                return True
            else:
                print(f"   Error: {response.text}")
                return False
        except Exception as e:
            print(f"❌ Get All States failed: {str(e)}")
            return False

    async def test_get_clause_library(self) -> bool:
        """Test get clause library with authentication"""
        try:
            response = await self.client.get(
                f"{self.base_url}/api/v1/clauses/library",
                headers={"Authorization": f"Bearer {self.auth_token}"}
            )
            print(f"✅ Get Clause Library (Auth): {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                print(f"   Total clauses: {data['data']['total']}")
                return True
            else:
                print(f"   Error: {response.text}")
                return False
        except Exception as e:
            print(f"❌ Get Clause Library failed: {str(e)}")
            return False

    async def test_calculate_stamp_duty(self) -> bool:
        """Test calculate stamp duty with authentication"""
        try:
            response = await self.client.get(
                f"{self.base_url}/api/v1/stamp-duty/calculate",
                params={
                    "state": "maharashtra",
                    "doc_type": "rent_agreement",
                    "document_value": 10000.0
                },
                headers={"Authorization": f"Bearer {self.auth_token}"}
            )
            print(f"✅ Calculate Stamp Duty (Auth): {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                print(f"   Stamp duty: ₹{data['data']['stamp_duty_amount']}")
                return True
            else:
                print(f"   Error: {response.text}")
                return False
        except Exception as e:
            print(f"❌ Calculate Stamp Duty failed: {str(e)}")
            return False

    async def test_get_recommended_clauses(self) -> bool:
        """Test get recommended clauses with authentication"""
        try:
            response = await self.client.get(
                f"{self.base_url}/api/v1/clauses/recommended/nda",
                headers={"Authorization": f"Bearer {self.auth_token}"}
            )
            print(f"✅ Get Recommended Clauses (Auth): {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                print(f"   Recommended clauses: {data['data']['total']}")
                return True
            else:
                print(f"   Error: {response.text}")
                return False
        except Exception as e:
            print(f"❌ Get Recommended Clauses failed: {str(e)}")
            return False

    async def test_get_documents(self) -> bool:
        """Test get documents with authentication"""
        try:
            response = await self.client.get(
                f"{self.base_url}/api/v1/documents/",
                headers={"Authorization": f"Bearer {self.auth_token}"}
            )
            print(f"✅ Get Documents (Auth): {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                print(f"   Total documents: {data['data']['total']}")
                return True
            else:
                print(f"   Error: {response.text}")
                return False
        except Exception as e:
            print(f"❌ Get Documents failed: {str(e)}")
            return False

    async def test_compare_states(self) -> bool:
        """Test compare states with authentication"""
        try:
            response = await self.client.get(
                f"{self.base_url}/api/v1/stamp-duty/compare",
                params={
                    "doc_type": "rent_agreement",
                    "document_value": 10000.0
                },
                headers={"Authorization": f"Bearer {self.auth_token}"}
            )
            print(f"✅ Compare States (Auth): {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                print(f"   States compared: {data['data']['total']}")
                if data['data']['lowest']:
                    print(f"   Lowest: {data['data']['lowest']['state']}")
                return True
            else:
                print(f"   Error: {response.text}")
                return False
        except Exception as e:
            print(f"❌ Compare States failed: {str(e)}")
            return False

    async def test_get_gst_clause(self) -> bool:
        """Test get GST clause with authentication"""
        try:
            response = await self.client.get(
                f"{self.base_url}/api/v1/clauses/gst",
                params={
                    "is_taxable": True,
                    "is_reverse_charge": False
                },
                headers={"Authorization": f"Bearer {self.auth_token}"}
            )
            print(f"✅ Get GST Clause (Auth): {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                print(f"   Is taxable: {data['data']['is_taxable']}")
                return True
            else:
                print(f"   Error: {response.text}")
                return False
        except Exception as e:
            print(f"❌ Get GST Clause failed: {str(e)}")
            return False

    async def run_e2e_tests(self) -> Dict[str, bool]:
        """Run end-to-end tests with authentication"""
        print("\n" + "="*60)
        print("🧪 Kavach End-to-End Test Suite with Authentication")
        print("="*60 + "\n")

        results = {}

        # Test authentication flow
        print("🔐 Testing Authentication Flow:")
        print("-" * 60)
        results["register_user"] = await self.register_user()
        results["login_user"] = await self.login_user()
        results["get_current_user"] = await self.get_current_user()
        print()

        # Test authenticated endpoints
        print("📋 Testing Authenticated Endpoints:")
        print("-" * 60)
        results["get_all_states_auth"] = await self.test_get_all_states()
        results["get_clause_library_auth"] = await self.test_get_clause_library()
        results["calculate_stamp_duty_auth"] = await self.test_calculate_stamp_duty()
        results["get_recommended_clauses_auth"] = await self.test_get_recommended_clauses()
        results["get_documents_auth"] = await self.test_get_documents()
        results["compare_states_auth"] = await self.test_compare_states()
        results["get_gst_clause_auth"] = await self.test_get_gst_clause()
        print()

        # Print summary
        print("="*60)
        print("📊 Test Summary")
        print("="*60)
        passed = sum(1 for result in results.values() if result)
        total = len(results)
        print(f"Passed: {passed}/{total}")
        print(f"Failed: {total - passed}/{total}")

        for test_name, result in results.items():
            status = "✅" if result else "❌"
            print(f"{status} {test_name}")

        print("="*60 + "\n")

        return results

    async def close(self):
        """Close the HTTP client"""
        await self.client.aclose()


async def main():
    """Main test function"""
    tester = KavachE2ETester()

    try:
        results = await tester.run_e2e_tests()

        # Exit with appropriate code
        passed = sum(1 for result in results.values() if result)
        total = len(results)

        if passed == total:
            print("🎉 All end-to-end tests passed!")
            exit(0)
        else:
            print(f"⚠️  {total - passed} test(s) failed")
            exit(1)

    except Exception as e:
        print(f"❌ End-to-end test suite failed: {str(e)}")
        exit(1)
    finally:
        await tester.close()


if __name__ == "__main__":
    asyncio.run(main())
