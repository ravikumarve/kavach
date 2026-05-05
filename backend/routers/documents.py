"""
Kavach - AI Legal Document Engine for India
Documents Router
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Dict, Any
import uuid

from database import get_db
from models import User, Document
from routers.auth import get_current_user


# Create router
router = APIRouter()


@router.get("/", response_model=Dict[str, Any])
async def get_documents(
    skip: int = 0,
    limit: int = 20,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    Get all documents for the current user.
    """
    documents = db.query(Document).filter(
        Document.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    
    return {
        "success": True,
        "data": {
            "documents": [
                {
                    "id": str(doc.id),
                    "title": doc.title,
                    "doc_type": doc.doc_type,
                    "status": doc.status,
                    "created_at": doc.created_at.isoformat(),
                    "updated_at": doc.updated_at.isoformat()
                }
                for doc in documents
            ],
            "total": len(documents)
        }
    }


@router.get("/{document_id}", response_model=Dict[str, Any])
async def get_document(
    document_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    Get a specific document by ID.
    """
    document = db.query(Document).filter(
        Document.id == uuid.UUID(document_id),
        Document.user_id == current_user.id
    ).first()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    return {
        "success": True,
        "data": {
            "document": {
                "id": str(document.id),
                "title": document.title,
                "doc_type": document.doc_type,
                "content_json": document.content_json,
                "content_html": document.content_html,
                "status": document.status,
                "clauses": document.clauses,
                "metadata": document.metadata,
                "created_at": document.created_at.isoformat(),
                "updated_at": document.updated_at.isoformat()
            }
        }
    }


@router.delete("/{document_id}", response_model=Dict[str, Any])
async def delete_document(
    document_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    Delete a document by ID.
    """
    document = db.query(Document).filter(
        Document.id == uuid.UUID(document_id),
        Document.user_id == current_user.id
    ).first()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    db.delete(document)
    db.commit()
    
    return {
        "success": True,
        "data": {
            "message": "Document deleted successfully"
        }
    }