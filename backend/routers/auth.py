"""
Kavach - AI Legal Document Engine for India
Authentication Router
"""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from argon2 import PasswordHasher
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Dict, Any
from pydantic import BaseModel, EmailStr
import uuid

from database import get_db
from models import User
from config import settings


# Pydantic models for request/response
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str = None
    company_name: str = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


# Create router
router = APIRouter()


# Password hashing with Argon2
ph = PasswordHasher(
    time_cost=3,        # Number of iterations
    memory_cost=65536,   # Memory usage in KiB
    parallelism=4,      # Number of parallel threads
    hash_len=32,        # Hash length
    salt_len=16         # Salt length
)


# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hash."""
    try:
        ph.verify(hashed_password, plain_password)
        return True
    except:
        return False


def get_password_hash(password: str) -> str:
    """Hash a password."""
    return ph.hash(password)


def create_access_token(data: Dict[str, Any], expires_delta: timedelta = None) -> str:
    """Create a JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.JWT_EXPIRATION_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    """Get the current authenticated user."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.id == uuid.UUID(user_id)).first()
    if user is None:
        raise credentials_exception
    
    return user


@router.post("/register", response_model=Dict[str, Any])
async def register(
    user_data: UserRegister,
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    Register a new user.
    """
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create new user
    hashed_password = get_password_hash(user_data.password)
    new_user = User(
        email=user_data.email,
        hashed_password=hashed_password,
        full_name=user_data.full_name,
        company_name=user_data.company_name,
        plan="free"
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Create access token
    access_token = create_access_token(data={"sub": str(new_user.id)})
    
    return {
        "success": True,
        "data": {
            "user": {
                "id": str(new_user.id),
                "email": new_user.email,
                "full_name": new_user.full_name,
                "company_name": new_user.company_name,
                "plan": new_user.plan,
                "created_at": new_user.created_at.isoformat()
            },
            "access_token": access_token,
            "token_type": "bearer"
        }
    }


@router.post("/login", response_model=Dict[str, Any])
async def login(
    user_data: UserLogin,
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    Login a user.
    """
    # Find user by email
    user = db.query(User).filter(User.email == user_data.email).first()
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": str(user.id)})
    
    return {
        "success": True,
        "data": {
            "user": {
                "id": str(user.id),
                "email": user.email,
                "full_name": user.full_name,
                "company_name": user.company_name,
                "plan": user.plan,
                "created_at": user.created_at.isoformat()
            },
            "access_token": access_token,
            "token_type": "bearer"
        }
    }


@router.get("/me", response_model=Dict[str, Any])
async def get_me(current_user: User = Depends(get_current_user)) -> Dict[str, Any]:
    """
    Get current user information.
    """
    return {
        "success": True,
        "data": {
            "user": {
                "id": str(current_user.id),
                "email": current_user.email,
                "full_name": current_user.full_name,
                "company_name": current_user.company_name,
                "phone": current_user.phone,
                "plan": current_user.plan,
                "is_active": current_user.is_active,
                "created_at": current_user.created_at.isoformat(),
                "updated_at": current_user.updated_at.isoformat() if current_user.updated_at else None
            }
        }
    }