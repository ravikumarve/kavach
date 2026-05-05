"""
Kavach - AI Legal Document Engine for India
Templates Router
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Dict, Any
import uuid

from database import get_db
from models import User, Template


# Create router
router = APIRouter()


@router.get("/", response_model=Dict[str, Any])
async def get_templates(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    Get all available templates.
    """
    templates = db.query(Template).filter(
        Template.is_active == True
    ).order_by(Template.sort_order).all()
    
    return {
        "success": True,
        "data": {
            "templates": [
                {
                    "id": str(template.id),
                    "name": template.name,
                    "doc_type": template.doc_type,
                    "description": template.description,
                    "icon": template.icon,
                    "category": template.category
                }
                for template in templates
            ],
            "total": len(templates)
        }
    }


@router.get("/{doc_type}/fields", response_model=Dict[str, Any])
async def get_template_fields(
    doc_type: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    Get fields schema for a specific document type.
    """
    template = db.query(Template).filter(
        Template.doc_type == doc_type,
        Template.is_active == True
    ).first()
    
    if not template:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Template not found"
        )
    
    return {
        "success": True,
        "data": {
            "template": {
                "id": str(template.id),
                "name": template.name,
                "doc_type": template.doc_type,
                "description": template.description,
                "fields_schema": template.fields_schema
            }
        }
    }