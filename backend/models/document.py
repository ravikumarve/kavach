"""
Kavach - AI Legal Document Engine for India
Document Model
"""

from sqlalchemy import Column, String, DateTime, Text, JSON as SQLJSON, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey
import uuid
import enum

from database import Base


class DocumentStatusEnum(str, enum.Enum):
    """Document status enumeration."""
    DRAFT = "draft"
    COMPLETE = "complete"
    ARCHIVED = "archived"


class DocumentTypeEnum(str, enum.Enum):
    """Document type enumeration."""
    NDA = "nda"
    FREELANCE_CONTRACT = "freelance_contract"
    RENT_AGREEMENT = "rent_agreement"
    VENDOR_AGREEMENT = "vendor_agreement"
    OFFER_LETTER = "offer_letter"
    PARTNERSHIP_DEED = "partnership_deed"
    SERVICE_AGREEMENT = "service_agreement"
    CONSULTANT_AGREEMENT = "consultant_agreement"


class Document(Base):
    """
    Document model representing generated legal documents.
    """
    __tablename__ = "documents"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    doc_type = Column(SQLEnum(DocumentTypeEnum), nullable=False, index=True)
    title = Column(String(500), nullable=False)
    content_json = Column(SQLJSON, nullable=False)
    content_html = Column(Text)
    pdf_path = Column(String(500))
    docx_path = Column(String(500))
    status = Column(SQLEnum(DocumentStatusEnum), default=DocumentStatusEnum.DRAFT, nullable=False)
    clauses = Column(SQLJSON)
    metadata = Column(SQLJSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<Document(id={self.id}, title={self.title}, type={self.doc_type})>"