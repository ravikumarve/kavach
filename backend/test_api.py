"""
Kavach - AI Legal Document Engine for India
Test Script for Document Generation Flow
"""

import asyncio
import httpx
import json
from typing import Dict, Any


class KavachAPITester:
    """Test class for Kavach API endpoints"""

    def __init__(self, base_url: str = "http://localhost:8000"):
        self.base_url = base_url
        self.client = httpx.AsyncClient(timeout=300.0)  # 5 minute timeout for AI generation
        self.auth_token = None

    async def test_health_check(self) -> bool:
        """Test health check endpoint"""
        try:
            response = await self.client.get(f"{self.base_url}/health")
            print(f"✅ Health Check: {response.status_code}")
            print(f"   Response: {response.json()}")
            return response.status_code == 200
        except Exception as e:
            print(f"❌ Health Check failed: {str(e)}")
            return False

    async def test_get_all_states(self) -> bool:
        """Test get all states endpoint"""
        try:
            response = await self.client.get(
                f"{self.base_url}/api/v1/stamp-duty/states"
            )
            print(f"✅ Get All States: {response.status_code}")
            data = response.json()
            print(f"   Total states: {data['data']['total']}")
            return response.status_code == 200
        except Exception as e:
            print(f"❌ Get All States failed: {str(e)}")
            return False

    async def test_get_clause_library(self) -> bool:
        """Test get clause library endpoint"""
        try:
            response = await self.client.get(
                f"{self.base_url}/api/v1/clauses/library"
            )
            print(f"✅ Get Clause Library: {response.status_code}")
            data = response.json()
            print(f"   Total clauses: {data['data']['total']}")
            return response.status_code == 200
        except Exception as e:
            print(f"❌ Get Clause Library failed: {str(e)}")
            return False

    async def test_get_recommended_clauses(self, doc_type: str = "nda") -> bool:
        """Test get recommended clauses endpoint"""
        try:
            response = await self.client.get(
                f"{self.base_url}/api/v1/clauses/recommended/{doc_type}"
            )
            print(f"✅ Get Recommended Clauses ({doc_type}): {response.status_code}")
            data = response.json()
            print(f"   Recommended clauses: {data['data']['total']}")
            return response.status_code == 200
        except Exception as e:
            print(f"❌ Get Recommended Clauses failed: {str(e)}")
            return False

    async def test_calculate_stamp_duty(
        self,
        state: str = "maharashtra",
        doc_type: str = "rent_agreement",
        document_value: float = 10000.0
    ) -> bool:
        """Test calculate stamp duty endpoint"""
        try:
            response = await self.client.get(
                f"{self.base_url}/api/v1/stamp-duty/calculate",
                params={
                    "state": state,
                    "doc_type": doc_type,
                    "document_value": document_value
                }
            )
            print(f"✅ Calculate Stamp Duty: {response.status_code}")
            data = response.json()
            print(f"   Stamp duty amount: ₹{data['data']['stamp_duty_amount']}")
            print(f"   Total amount: ₹{data['data']['total_amount']}")
            return response.status_code == 200
        except Exception as e:
            print(f"❌ Calculate Stamp Duty failed: {str(e)}")
            return False

    async def test_compare_states(
        self,
        doc_type: str = "rent_agreement",
        document_value: float = 10000.0
    ) -> bool:
        """Test compare states endpoint"""
        try:
            response = await self.client.get(
                f"{self.base_url}/api/v1/stamp-duty/compare",
                params={
                    "doc_type": doc_type,
                    "document_value": document_value
                }
            )
            print(f"✅ Compare States: {response.status_code}")
            data = response.json()
            print(f"   States compared: {data['data']['total']}")
            if data['data']['lowest']:
                print(f"   Lowest: {data['data']['lowest']['state']} - ₹{data['data']['lowest']['stamp_duty_amount']}")
            if data['data']['highest']:
                print(f"   Highest: {data['data']['highest']['state']} - ₹{data['data']['highest']['stamp_duty_amount']}")
            return response.status_code == 200
        except Exception as e:
            print(f"❌ Compare States failed: {str(e)}")
            return False

    async def test_get_document_types(self) -> bool:
        """Test get document types endpoint"""
        try:
            response = await self.client.get(
                f"{self.base_url}/api/v1/stamp-duty/document-types"
            )
            print(f"✅ Get Document Types: {response.status_code}")
            data = response.json()
            print(f"   Total document types: {data['data']['total']}")
            return response.status_code == 200
        except Exception as e:
            print(f"❌ Get Document Types failed: {str(e)}")
            return False

    async def test_get_gst_clause(self, is_taxable: bool = True, is_reverse_charge: bool = False) -> bool:
        """Test get GST clause endpoint"""
        try:
            response = await self.client.get(
                f"{self.base_url}/api/v1/clauses/gst",
                params={
                    "is_taxable": is_taxable,
                    "is_reverse_charge": is_reverse_charge
                }
            )
            print(f"✅ Get GST Clause: {response.status_code}")
            data = response.json()
            print(f"   Is taxable: {data['data']['is_taxable']}")
            print(f"   Is reverse charge: {data['data']['is_reverse_charge']}")
            return response.status_code == 200
        except Exception as e:
            print(f"❌ Get GST Clause failed: {str(e)}")
            return False

    async def run_all_tests(self) -> Dict[str, bool]:
        """Run all API tests"""
        print("\n" + "="*60)
        print("🧪 Kavach API Test Suite")
        print("="*60 + "\n")

        results = {}

        # Test basic endpoints
        print("📋 Testing Basic Endpoints:")
        print("-" * 60)
        results["health_check"] = await self.test_health_check()
        print()

        # Test stamp duty endpoints
        print("💰 Testing Stamp Duty Endpoints:")
        print("-" * 60)
        results["get_all_states"] = await self.test_get_all_states()
        results["calculate_stamp_duty"] = await self.test_calculate_stamp_duty()
        results["compare_states"] = await self.test_compare_states()
        results["get_document_types"] = await self.test_get_document_types()
        print()

        # Test clause endpoints
        print("📝 Testing Clause Endpoints:")
        print("-" * 60)
        results["get_clause_library"] = await self.test_get_clause_library()
        results["get_recommended_clauses"] = await self.test_get_recommended_clauses()
        results["get_gst_clause"] = await self.test_get_gst_clause()
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
    tester = KavachAPITester()

    try:
        results = await tester.run_all_tests()

        # Exit with appropriate code
        passed = sum(1 for result in results.values() if result)
        total = len(results)

        if passed == total:
            print("🎉 All tests passed!")
            exit(0)
        else:
            print(f"⚠️  {total - passed} test(s) failed")
            exit(1)

    except Exception as e:
        print(f"❌ Test suite failed: {str(e)}")
        exit(1)
    finally:
        await tester.close()


if __name__ == "__main__":
    asyncio.run(main())
