"""
Kavach - AI Legal Document Engine for India
User Model
"""

from sqlalchemy import Column, String, DateTime, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
import enum

from database import Base


class PlanEnum(str, enum.Enum):
    """Subscription plan enumeration."""
    FREE = "free"
    STARTER = "starter"
    PRO = "pro"
    AGENCY = "agency"


class User(Base):
    """
    User model representing application users.
    """
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255))
    company_name = Column(String(255))
    phone = Column(String(20))
    state = Column(String(100))
    plan = Column(SQLEnum(PlanEnum), default=PlanEnum.FREE, nullable=False)
    is_active = Column(String(10), default="true", nullable=False)
    is_verified = Column(String(10), default="false", nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, plan={self.plan})>"