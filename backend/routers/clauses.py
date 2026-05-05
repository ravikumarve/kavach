"""
Kavach - AI Legal Document Engine for India
Clauses Router - Clause Management and Editing
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Dict, List, Optional
import uuid
from datetime import datetime

from database import get_db
from models import User, Document
from routers.auth import get_current_user
from services.clause_library import clause_library


# Create router
router = APIRouter()


@router.get("/library")
async def get_clause_library(
    current_user: User = Depends(get_current_user)
) -> Dict[str, str]:
    """
    Get all available clauses from the clause library

    Args:
        current_user: Current authenticated user

    Returns:
        Dictionary of all clauses
    """
    try:
        clauses = clause_library.get_all_clauses()
        return {
            "success": True,
            "data": {
                "clauses": clauses,
                "total": len(clauses)
            }
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get clause library: {str(e)}"
        )


@router.get("/library/{clause_type}")
async def get_clause(
    clause_type: str,
    current_user: User = Depends(get_current_user)
) -> Dict[str, str]:
    """
    Get a specific clause from the library

    Args:
        clause_type: Type of clause to retrieve
        current_user: Current authenticated user

    Returns:
        Clause content
    """
    try:
        clause = clause_library.get_clause(clause_type)

        if not clause:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Clause not found: {clause_type}"
            )

        return {
            "success": True,
            "data": {
                "type": clause_type,
                "content": clause
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get clause: {str(e)}"
        )


@router.get("/recommended/{doc_type}")
async def get_recommended_clauses(
    doc_type: str,
    current_user: User = Depends(get_current_user)
) -> Dict[str, List[str]]:
    """
    Get recommended clauses for a specific document type

    Args:
        doc_type: Type of document
        current_user: Current authenticated user

    Returns:
        List of recommended clause types
    """
    try:
        clause_types = clause_library.get_clauses_for_doc_type(doc_type)

        # Get clause contents
        clauses = {}
        for clause_type in clause_types:
            clause_content = clause_library.get_clause(clause_type)
            if clause_content:
                clauses[clause_type] = clause_content

        return {
            "success": True,
            "data": {
                "doc_type": doc_type,
                "recommended_clauses": clauses,
                "total": len(clauses)
            }
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get recommended clauses: {str(e)}"
        )


@router.post("/document/{document_id}/add")
async def add_clause_to_document(
    document_id: str,
    clause_type: str,
    position: Optional[int] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, str]:
    """
    Add a clause to a document

    Args:
        document_id: Document ID
        clause_type: Type of clause to add
        position: Optional position to insert clause (default: append)
        current_user: Current authenticated user
        db: Database session

    Returns:
        Updated document content
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

        # Get clause content
        clause_content = clause_library.get_clause(clause_type)

        if not clause_content:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Clause not found: {clause_type}"
            )

        # Add clause to document HTML
        if position is not None and position >= 0:
            # Insert at specific position
            html_parts = document.content_html.split('</div>')
            if position < len(html_parts):
                html_parts.insert(position, clause_content)
                document.content_html = '</div>'.join(html_parts)
            else:
                # Append if position is out of range
                document.content_html += clause_content
        else:
            # Append to end
            document.content_html += clause_content

        # Update document
        document.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(document)

        return {
            "success": True,
            "data": {
                "document_id": str(document.id),
                "clause_type": clause_type,
                "content_html": document.content_html,
                "updated_at": document.updated_at.isoformat()
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to add clause to document: {str(e)}"
        )


@router.post("/document/{document_id}/remove")
async def remove_clause_from_document(
    document_id: str,
    clause_type: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, str]:
    """
    Remove a clause from a document

    Args:
        document_id: Document ID
        clause_type: Type of clause to remove
        current_user: Current authenticated user
        db: Database session

    Returns:
        Updated document content
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

        # Get clause content to identify it
        clause_content = clause_library.get_clause(clause_type)

        if not clause_content:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Clause not found: {clause_type}"
            )

        # Remove clause from document HTML
        if clause_content in document.content_html:
            document.content_html = document.content_html.replace(clause_content, "")

            # Update document
            document.updated_at = datetime.utcnow()
            db.commit()
            db.refresh(document)
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Clause not found in document"
            )

        return {
            "success": True,
            "data": {
                "document_id": str(document.id),
                "clause_type": clause_type,
                "content_html": document.content_html,
                "updated_at": document.updated_at.isoformat()
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to remove clause from document: {str(e)}"
        )


@router.post("/document/{document_id}/custom")
async def add_custom_clause(
    document_id: str,
    clause_title: str,
    clause_content: str,
    position: Optional[int] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, str]:
    """
    Add a custom clause to a document

    Args:
        document_id: Document ID
        clause_title: Title of the custom clause
        clause_content: Content of the custom clause
        position: Optional position to insert clause (default: append)
        current_user: Current authenticated user
        db: Database session

    Returns:
        Updated document content
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

        # Create custom clause HTML
        custom_clause = f"""
        <div class="clause custom-clause">
            <h3 class="clause-number">{clause_title}</h3>
            {clause_content}
        </div>
        """

        # Add clause to document HTML
        if position is not None and position >= 0:
            # Insert at specific position
            html_parts = document.content_html.split('</div>')
            if position < len(html_parts):
                html_parts.insert(position, custom_clause)
                document.content_html = '</div>'.join(html_parts)
            else:
                # Append if position is out of range
                document.content_html += custom_clause
        else:
            # Append to end
            document.content_html += custom_clause

        # Update document
        document.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(document)

        return {
            "success": True,
            "data": {
                "document_id": str(document.id),
                "clause_title": clause_title,
                "content_html": document.content_html,
                "updated_at": document.updated_at.isoformat()
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to add custom clause to document: {str(e)}"
        )


@router.get("/gst")
async def get_gst_clause(
    is_taxable: bool,
    is_reverse_charge: bool = False,
    current_user: User = Depends(get_current_user)
) -> Dict[str, str]:
    """
    Get appropriate GST clause based on taxability

    Args:
        is_taxable: Whether the service is taxable
        is_reverse_charge: Whether reverse charge applies
        current_user: Current authenticated user

    Returns:
        GST clause content
    """
    try:
        clause = clause_library.get_gst_clause(is_taxable, is_reverse_charge)

        return {
            "success": True,
            "data": {
                "is_taxable": is_taxable,
                "is_reverse_charge": is_reverse_charge,
                "content": clause
            }
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get GST clause: {str(e)}"
        )
