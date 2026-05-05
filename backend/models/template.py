"""
Kavach - AI Legal Document Engine for India
Template Model
"""

from sqlalchemy import Column, String, DateTime, Text, JSON as SQLJSON, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from database import Base


class Template(Base):
    """
    Template model representing document templates.
    """
    __tablename__ = "templates"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    doc_type = Column(String(100), nullable=False, unique=True, index=True)
    prompt_key = Column(String(100), nullable=False, unique=True)
    fields_schema = Column(SQLJSON, nullable=False)
    description = Column(Text)
    icon = Column(String(50))
    category = Column(String(100))
    is_active = Column(Boolean, default=True, nullable=False)
    sort_order = Column(String(10), default="0")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<Template(id={self.id}, name={self.name}, type={self.doc_type})>"