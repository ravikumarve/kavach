"""
Kavach - AI Legal Document Engine for India
Generation Router
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Dict, Any
import uuid
from datetime import datetime

from database import get_db
from models import User, Document, DocumentTypeEnum, DocumentStatusEnum
from routers.auth import get_current_user
from services.ai_engine import AIEngine
from services.pdf_service import PDFService


# Create router
router = APIRouter()

# Initialize services
ai_engine = AIEngine()
pdf_service = PDFService()


@router.post("/", response_model=Dict[str, Any])
async def generate_document(
    doc_type: str,
    form_data: Dict[str, Any],
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    Generate a new document using AI.
    """
    try:
        # Check user's document quota
        if current_user.plan == "free" and current_user.documents_used_this_month >= 3:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Document quota exceeded. Please upgrade your plan."
            )
        elif current_user.plan == "starter" and current_user.documents_used_this_month >= 20:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Document quota exceeded. Please upgrade your plan."
            )

        # Validate document type
        try:
            document_type = DocumentTypeEnum(doc_type)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid document type: {doc_type}"
            )

        # Create document record
        document = Document(
            user_id=current_user.id,
            doc_type=document_type,
            title=form_data.get("title", f"{document_type.value.replace('_', ' ').title()}"),
            content_json=form_data,
            status=DocumentStatusEnum.GENERATING,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        db.add(document)
        db.commit()
        db.refresh(document)

        # Generate document using AI
        try:
            generated_content = await ai_engine.generate_document(
                doc_type=document_type,
                form_data=form_data
            )

            # Update document with generated content
            document.content_html = generated_content["html"]
            document.content_json = {
                **form_data,
                "generated_content": generated_content["text"]
            }
            document.status = DocumentStatusEnum.COMPLETED
            document.updated_at = datetime.utcnow()

            # Generate PDF
            pdf_path = await pdf_service.generate_pdf(
                document_id=str(document.id),
                html_content=generated_content["html"],
                title=document.title
            )
            document.pdf_path = pdf_path

            db.commit()
            db.refresh(document)

            # Update user's document count
            current_user.documents_used_this_month += 1
            db.commit()

            return {
                "success": True,
                "data": {
                    "document": {
                        "id": str(document.id),
                        "title": document.title,
                        "type": document.doc_type.value,
                        "status": document.status.value,
                        "content_html": document.content_html,
                        "pdf_path": document.pdf_path,
                        "created_at": document.created_at.isoformat(),
                        "updated_at": document.updated_at.isoformat()
                    }
                }
            }

        except Exception as e:
            # Update document status to failed
            document.status = DocumentStatusEnum.FAILED
            document.updated_at = datetime.utcnow()
            db.commit()

            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to generate document: {str(e)}"
            )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}"
        )


@router.post("/refine", response_model=Dict[str, Any])
async def refine_document(
    document_id: str,
    instruction: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    Refine an existing document using AI.
    """
    try:
        # Get document
        document = db.query(Document).filter(
            Document.id == uuid.UUID(document_id),
            Document.user_id == current_user.id
        ).first()

        if not document:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Document not found"
            )

        # Refine document using AI
        try:
            refined_content = await ai_engine.refine_document(
                original_content=document.content_html,
                instruction=instruction,
                doc_type=document.doc_type.value
            )

            # Update document with refined content
            document.content_html = refined_content["html"]
            document.content_json = {
                **document.content_json,
                "refined_content": refined_content["text"]
            }
            document.updated_at = datetime.utcnow()

            # Regenerate PDF
            pdf_path = await pdf_service.generate_pdf(
                document_id=str(document.id),
                html_content=refined_content["html"],
                title=document.title
            )
            document.pdf_path = pdf_path

            db.commit()
            db.refresh(document)

            return {
                "success": True,
                "data": {
                    "document": {
                        "id": str(document.id),
                        "title": document.title,
                        "type": document.doc_type.value,
                        "status": document.status.value,
                        "content_html": document.content_html,
                        "pdf_path": document.pdf_path,
                        "updated_at": document.updated_at.isoformat()
                    }
                }
            }

        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to refine document: {str(e)}"
            )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}"
        )


@router.get("/preview/{document_id}", response_model=Dict[str, Any])
async def preview_document(
    document_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    Get a preview of a document.
    """
    try:
        # Get document
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
                    "type": document.doc_type.value,
                    "status": document.status.value,
                    "content_html": document.content_html,
                    "created_at": document.created_at.isoformat(),
                    "updated_at": document.updated_at.isoformat()
                }
            }
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}"
        )