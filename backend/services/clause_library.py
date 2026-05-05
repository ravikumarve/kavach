"""
Kavach - AI Legal Document Engine for India
Clause Library - India-specific Legal Clauses
"""

from typing import Dict, List, Optional


class ClauseLibrary:
    """India-specific legal clause library"""
    
    CLAUSES = {
        "gst_forward_charge": """
            <div class="clause">
                <h3 class="clause-number">GST Clause</h3>
                <p>All charges under this Agreement are exclusive of Goods and Services Tax (GST) as per the GST Act, 2017. The Service Provider shall charge GST at the applicable rate on the invoice amount, and the Client shall pay the GST amount in addition to the agreed charges.</p>
            </div>
        """,
        
        "gst_reverse_charge": """
            <div class="clause">
                <h3 class="clause-number">GST Reverse Charge</h3>
                <p>As per the provisions of the GST Act, 2017, the Client shall be liable to pay GST under reverse charge mechanism on the services provided under this Agreement. The Service Provider shall not charge GST on the invoice amount, and the Client shall discharge the GST liability directly to the government.</p>
            </div>
        """,
        
        "msme_payment_protection": """
            <div class="clause">
                <h3 class="clause-number">MSME Payment Protection</h3>
                <p>In accordance with the Micro, Small and Medium Enterprises Development Act, 2006, the Client agrees to make all payments to the Service Provider within 45 days from the date of acceptance of goods/services or invoice, whichever is later. Any delay beyond this period shall attract interest at the rate specified under the Act.</p>
            </div>
        """,
        
        "arbitration_india": """
            <div class="clause">
                <h3 class="clause-number">Dispute Resolution</h3>
                <p>Any dispute, controversy, or claim arising out of or relating to this Agreement, including any question regarding its existence, validity, or termination, shall be referred to and finally resolved by arbitration administered by the Arbitration and Conciliation Act, 1996. The seat of arbitration shall be [CITY], India, and the language of arbitration shall be English.</p>
            </div>
        """,
        
        "force_majeure_india": """
            <div class="clause">
                <h3 class="clause-number">Force Majeure</h3>
                <p>Neither party shall be liable for any failure or delay in performance of its obligations under this Agreement to the extent such failure or delay is caused by events beyond the reasonable control of the affected party, including but not limited to acts of God, war, terrorism, natural disasters, government orders, pandemics, or any other circumstances beyond the reasonable control of the party.</p>
            </div>
        """,
        
        "ip_ownership_india": """
            <div class="clause">
                <h3 class="clause-number">Intellectual Property Ownership</h3>
                <p>All intellectual property rights, including but not limited to copyrights, patents, trademarks, and trade secrets, in any work product, deliverables, or materials created by the Service Provider under this Agreement shall vest exclusively in the Client upon full payment of the agreed fees. The Service Provider assigns all such rights to the Client and agrees to execute all necessary documents to perfect such assignment.</p>
            </div>
        """,
        
        "non_compete_reasonable": """
            <div class="clause">
                <h3 class="clause-number">Non-Compete</h3>
                <p>During the term of this Agreement and for a period of [TIME_PERIOD] months thereafter, the Service Provider agrees not to engage in any business activities that directly compete with the Client's business within the geographical area of [GEOGRAPHY]. This restriction is reasonable and necessary to protect the Client's legitimate business interests.</p>
            </div>
        """,
        
        "data_protection_india": """
            <div class="clause">
                <h3 class="clause-number">Data Protection</h3>
                <p>Both parties agree to handle all personal data and sensitive information in accordance with the Digital Personal Data Protection Act, 2023 and any other applicable data protection laws in India. Each party shall implement appropriate technical and organizational measures to protect such data from unauthorized access, use, or disclosure.</p>
            </div>
        """,
        
        "governing_law_india": """
            <div class="clause">
                <h3 class="clause-number">Governing Law and Jurisdiction</h3>
                <p>This Agreement shall be governed by and construed in accordance with the laws of India. The courts of [CITY], India shall have exclusive jurisdiction over any disputes arising out of or relating to this Agreement.</p>
            </div>
        """,
        
        "stamp_duty_notice": """
            <div class="clause">
                <h3 class="clause-number">Stamp Duty Notice</h3>
                <p>This document may be liable to stamp duty under the Indian Stamp Act, 1899 and applicable state laws. The parties agree to ensure proper stamping and registration of this document as required by law. The cost of stamp duty and registration shall be borne by [PARTY_NAME].</p>
            </div>
        """,
    }
    
    @classmethod
    def get_clause(cls, clause_type: str) -> Optional[str]:
        """
        Get a clause by type
        
        Args:
            clause_type: Type of clause
            
        Returns:
            Clause content or None if not found
        """
        return cls.CLAUSES.get(clause_type)
    
    @classmethod
    def get_all_clauses(cls) -> Dict[str, str]:
        """Get all available clauses"""
        return cls.CLAUSES.copy()
    
    @classmethod
    def get_clauses_for_doc_type(cls, doc_type: str) -> List[str]:
        """
        Get recommended clauses for a document type
        
        Args:
            doc_type: Type of document
            
        Returns:
            List of clause types
        """
        clause_mapping = {
            "nda": [
                "data_protection_india",
                "governing_law_india",
                "arbitration_india"
            ],
            "freelance_contract": [
                "ip_ownership_india",
                "gst_forward_charge",
                "msme_payment_protection",
                "governing_law_india",
                "arbitration_india"
            ],
            "rent_agreement": [
                "governing_law_india",
                "stamp_duty_notice"
            ],
            "vendor_agreement": [
                "gst_forward_charge",
                "msme_payment_protection",
                "force_majeure_india",
                "governing_law_india",
                "arbitration_india"
            ],
            "offer_letter": [
                "governing_law_india"
            ],
            "partnership_deed": [
                "governing_law_india",
                "arbitration_india",
                "stamp_duty_notice"
            ],
            "service_agreement": [
                "gst_forward_charge",
                "ip_ownership_india",
                "msme_payment_protection",
                "force_majeure_india",
                "governing_law_india",
                "arbitration_india"
            ],
            "consultant_agreement": [
                "ip_ownership_india",
                "non_compete_reasonable",
                "gst_forward_charge",
                "governing_law_india",
                "arbitration_india"
            ]
        }
        
        return clause_mapping.get(doc_type, [])
    
    @classmethod
    def get_gst_clause(cls, is_taxable: bool, is_reverse_charge: bool = False) -> str:
        """
        Get appropriate GST clause based on taxability
        
        Args:
            is_taxable: Whether the service is taxable
            is_reverse_charge: Whether reverse charge applies
            
        Returns:
            GST clause content
        """
        if not is_taxable:
            return ""
        
        if is_reverse_charge:
            return cls.get_clause("gst_reverse_charge")
        
        return cls.get_clause("gst_forward_charge")


# Singleton instance
clause_library = ClauseLibrary()
