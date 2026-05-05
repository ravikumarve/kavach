"""
Kavach - AI Legal Document Engine for India
Subscription Model
"""

from sqlalchemy import Column, String, DateTime, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey
import uuid
import enum

from database import Base


class SubscriptionStatusEnum(str, enum.Enum):
    """Subscription status enumeration."""
    ACTIVE = "active"
    CANCELLED = "cancelled"
    EXPIRED = "expired"
    PENDING = "pending"


class PlanEnum(str, enum.Enum):
    """Subscription plan enumeration."""
    FREE = "free"
    STARTER = "starter"
    PRO = "pro"
    AGENCY = "agency"


class Subscription(Base):
    """
    Subscription model representing user subscriptions.
    """
    __tablename__ = "subscriptions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, unique=True, index=True)
    plan = Column(SQLEnum(PlanEnum), nullable=False)
    razorpay_sub_id = Column(String(255))
    status = Column(SQLEnum(SubscriptionStatusEnum), default=SubscriptionStatusEnum.ACTIVE, nullable=False)
    expires_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<Subscription(id={self.id}, user_id={self.user_id}, plan={self.plan})>"