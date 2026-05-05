"""
Kavach - AI Legal Document Engine for India
Configuration and Settings
"""

from pydantic_settings import BaseSettings
from typing import List
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    """

    # Application
    APP_NAME: str = "Kavach API"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    DEBUG: bool = ENVIRONMENT == "development"

    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://kavach:kavach@localhost:5432/kavach"
    )

    # Security
    JWT_SECRET: str = os.getenv("JWT_SECRET", "your-secret-key-change-in-production")
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_MINUTES: int = 60 * 24 * 7  # 7 days

    # Groq API
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    GROQ_MODEL: str = "llama-3.3-70b-versatile"
    GROQ_TEMPERATURE: float = 0.3
    GROQ_MAX_TOKENS: int = 4096

    # NVIDIA NIM API
    NVIDIA_NIM_API_KEY: str = os.getenv("NVIDIA_NIM_API_KEY", "")
    NVIDIA_NIM_API_KEY_BACKUP: str = os.getenv("NVIDIA_NIM_API_KEY_BACKUP", "")
    NVIDIA_NIM_MODEL: str = "meta/llama-3.3-70b-instruct"
    NVIDIA_NIM_MODEL_BACKUP: str = "nvidia/llama-3.3-nemotron-super-49b-v1.5"
    NVIDIA_NIM_TEMPERATURE: float = 0.3
    NVIDIA_NIM_MAX_TOKENS: int = 4096
    NVIDIA_NIM_API_URL: str = "https://integrate.api.nvidia.com/v1/chat/completions"

    # Razorpay
    RAZORPAY_KEY_ID: str = os.getenv("RAZORPAY_KEY_ID", "")
    RAZORPAY_SECRET: str = os.getenv("RAZORPAY_SECRET", "")
    RAZORPAY_WEBHOOK_SECRET: str = os.getenv("RAZORPAY_WEBHOOK_SECRET", "")

    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ]

    # File Storage
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "./uploads")
    PDF_DIR: str = os.getenv("PDF_DIR", "./uploads/pdf")
    DOCX_DIR: str = os.getenv("DOCX_DIR", "./uploads/docx")

    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    RATE_LIMIT_PER_HOUR: int = 1000

    # Pagination
    DEFAULT_PAGE_SIZE: int = 20
    MAX_PAGE_SIZE: int = 100

    # Logging
    LOG_LEVEL: str = "INFO"

    class Config:
        env_file = ".env"
        case_sensitive = True


# Create settings instance
settings = Settings()


# Create necessary directories
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(settings.PDF_DIR, exist_ok=True)
os.makedirs(settings.DOCX_DIR, exist_ok=True)