"""
Kavach - AI Legal Document Engine for India
Stamp Duty Service - State-wise Stamp Duty Lookup
"""

from typing import Dict, Optional


class StampDutyService:
    """India state-wise stamp duty lookup service"""
    
    STAMP_DUTY = {
        "andhra_pradesh": {
            "rent_agreement": 0.5,
            "nda": 0,
            "freelance_contract": 0.2,
            "vendor_agreement": 0.2,
            "service_agreement": 0.2,
            "consultant_agreement": 0.2,
            "partnership_deed": 0.5,
            "offer_letter": 0,
        },
        "bihar": {
            "rent_agreement": 2.0,
            "nda": 0,
            "freelance_contract": 0.5,
            "vendor_agreement": 0.5,
            "service_agreement": 0.5,
            "consultant_agreement": 0.5,
            "partnership_deed": 1.0,
            "offer_letter": 0,
        },
        "delhi": {
            "rent_agreement": 2.0,
            "nda": 0,
            "freelance_contract": 0.2,
            "vendor_agreement": 0.2,
            "service_agreement": 0.2,
            "consultant_agreement": 0.2,
            "partnership_deed": 0.5,
            "offer_letter": 0,
        },
        "gujarat": {
            "rent_agreement": 0.5,
            "nda": 0,
            "freelance_contract": 0.2,
            "vendor_agreement": 0.2,
            "service_agreement": 0.2,
            "consultant_agreement": 0.2,
            "partnership_deed": 0.5,
            "offer_letter": 0,
        },
        "karnataka": {
            "rent_agreement": 0.5,
            "nda": 0,
            "freelance_contract": 0.2,
            "vendor_agreement": 0.2,
            "service_agreement": 0.2,
            "consultant_agreement": 0.2,
            "partnership_deed": 0.5,
            "offer_letter": 0,
        },
        "kerala": {
            "rent_agreement": 1.0,
            "nda": 0,
            "freelance_contract": 0.2,
            "vendor_agreement": 0.2,
            "service_agreement": 0.2,
            "consultant_agreement": 0.2,
            "partnership_deed": 0.5,
            "offer_letter": 0,
        },
        "madhya_pradesh": {
            "rent_agreement": 2.0,
            "nda": 0,
            "freelance_contract": 0.5,
            "vendor_agreement": 0.5,
            "service_agreement": 0.5,
            "consultant_agreement": 0.5,
            "partnership_deed": 1.0,
            "offer_letter": 0,
        },
        "maharashtra": {
            "rent_agreement": 0.25,
            "nda": 0,
            "freelance_contract": 0.2,
            "vendor_agreement": 0.2,
            "service_agreement": 0.2,
            "consultant_agreement": 0.2,
            "partnership_deed": 0.5,
            "offer_letter": 0,
        },
        "punjab": {
            "rent_agreement": 2.0,
            "nda": 0,
            "freelance_contract": 0.5,
            "vendor_agreement": 0.5,
            "service_agreement": 0.5,
            "consultant_agreement": 0.5,
            "partnership_deed": 1.0,
            "offer_letter": 0,
        },
        "rajasthan": {
            "rent_agreement": 2.0,
            "nda": 0,
            "freelance_contract": 0.5,
            "vendor_agreement": 0.5,
            "service_agreement": 0.5,
            "consultant_agreement": 0.5,
            "partnership_deed": 1.0,
            "offer_letter": 0,
        },
        "tamil_nadu": {
            "rent_agreement": 1.0,
            "nda": 0,
            "freelance_contract": 0.2,
            "vendor_agreement": 0.2,
            "service_agreement": 0.2,
            "consultant_agreement": 0.2,
            "partnership_deed": 0.5,
            "offer_letter": 0,
        },
        "telangana": {
            "rent_agreement": 0.5,
            "nda": 0,
            "freelance_contract": 0.2,
            "vendor_agreement": 0.2,
            "service_agreement": 0.2,
            "consultant_agreement": 0.2,
            "partnership_deed": 0.5,
            "offer_letter": 0,
        },
        "uttar_pradesh": {
            "rent_agreement": 2.0,
            "nda": 0,
            "freelance_contract": 0.5,
            "vendor_agreement": 0.5,
            "service_agreement": 0.5,
            "consultant_agreement": 0.5,
            "partnership_deed": 1.0,
            "offer_letter": 0,
        },
        "west_bengal": {
            "rent_agreement": 0.5,
            "nda": 0,
            "freelance_contract": 0.2,
            "vendor_agreement": 0.2,
            "service_agreement": 0.2,
            "consultant_agreement": 0.2,
            "partnership_deed": 0.5,
            "offer_letter": 0,
        },
    }
    
    @classmethod
    def get_stamp_duty_rate(cls, state: str, doc_type: str) -> Optional[float]:
        """
        Get stamp duty rate for a state and document type
        
        Args:
            state: State name (snake_case)
            doc_type: Document type
            
        Returns:
            Stamp duty rate as percentage or None if not found
        """
        state_data = cls.STAMP_DUTY.get(state)
        if not state_data:
            return None
        
        return state_data.get(doc_type)
    
    @classmethod
    def calculate_stamp_duty(
        cls,
        state: str,
        doc_type: str,
        document_value: float
    ) -> Optional[float]:
        """
        Calculate stamp duty amount
        
        Args:
            state: State name (snake_case)
            doc_type: Document type
            document_value: Value of the document
            
        Returns:
            Stamp duty amount or None if not found
        """
        rate = cls.get_stamp_duty_rate(state, doc_type)
        if rate is None:
            return None
        
        return (document_value * rate) / 100
    
    @classmethod
    def get_all_states(cls) -> list:
        """Get list of all supported states"""
        return list(cls.STAMP_DUTY.keys())
    
    @classmethod
    def get_doc_types_for_state(cls, state: str) -> Optional[Dict[str, float]]:
        """
        Get all document types and rates for a state
        
        Args:
            state: State name (snake_case)
            
        Returns:
            Dictionary of document types and rates or None if not found
        """
        return cls.STAMP_DUTY.get(state)


# Singleton instance
stamp_duty_service = StampDutyService()
