"""
Kavach - AI Legal Document Engine for India
Stamp Duty Router - Stamp Duty Calculation
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Dict, List, Optional, Any

from database import get_db
from models import User
from routers.auth import get_current_user
from services.stamp_duty import stamp_duty_service


# Create router
router = APIRouter()


@router.get("/states")
async def get_all_states(
    current_user: User = Depends(get_current_user)
) -> Dict[str, List[str]]:
    """
    Get list of all supported states

    Args:
        current_user: Current authenticated user

    Returns:
        List of state names
    """
    try:
        states = stamp_duty_service.get_all_states()

        # Format state names for display
        formatted_states = []
        for state in states:
            formatted_state = state.replace("_", " ").title()
            formatted_states.append({
                "code": state,
                "name": formatted_state
            })

        return {
            "success": True,
            "data": {
                "states": formatted_states,
                "total": len(formatted_states)
            }
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get states: {str(e)}"
        )


@router.get("/states/{state}/rates")
async def get_state_rates(
    state: str,
    current_user: User = Depends(get_current_user)
) -> Dict[str, Dict[str, float]]:
    """
    Get stamp duty rates for all document types in a state

    Args:
        state: State name (snake_case)
        current_user: Current authenticated user

    Returns:
        Dictionary of document types and rates
    """
    try:
        rates = stamp_duty_service.get_doc_types_for_state(state)

        if not rates:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"State not found: {state}"
            )

        # Format document types for display
        formatted_rates = {}
        for doc_type, rate in rates.items():
            formatted_doc_type = doc_type.replace("_", " ").title()
            formatted_rates[formatted_doc_type] = {
                "code": doc_type,
                "rate": rate,
                "is_taxable": rate > 0
            }

        return {
            "success": True,
            "data": {
                "state": state.replace("_", " ").title(),
                "rates": formatted_rates,
                "total": len(formatted_rates)
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get state rates: {str(e)}"
        )


@router.get("/calculate")
async def calculate_stamp_duty(
    state: str,
    doc_type: str,
    document_value: float,
    current_user: User = Depends(get_current_user)
) -> Dict[str, Any]:
    """
    Calculate stamp duty amount for a document

    Args:
        state: State name (snake_case)
        doc_type: Document type
        document_value: Value of the document
        current_user: Current authenticated user

    Returns:
        Stamp duty calculation details
    """
    try:
        # Validate document value
        if document_value < 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Document value must be non-negative"
            )

        # Get stamp duty rate
        rate = stamp_duty_service.get_stamp_duty_rate(state, doc_type)

        if rate is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Stamp duty rate not found for state: {state} and document type: {doc_type}"
            )

        # Calculate stamp duty
        stamp_duty_amount = stamp_duty_service.calculate_stamp_duty(
            state, doc_type, document_value
        )

        # Format response
        return {
            "success": True,
            "data": {
                "state": state.replace("_", " ").title(),
                "document_type": doc_type.replace("_", " ").title(),
                "document_value": document_value,
                "stamp_duty_rate": rate,
                "stamp_duty_amount": stamp_duty_amount,
                "total_amount": document_value + stamp_duty_amount,
                "is_taxable": rate > 0,
                "currency": "INR"
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to calculate stamp duty: {str(e)}"
        )


@router.get("/compare")
async def compare_states(
    doc_type: str,
    document_value: float,
    current_user: User = Depends(get_current_user)
) -> Dict[str, List[Dict]]:
    """
    Compare stamp duty rates across all states for a document type

    Args:
        doc_type: Document type
        document_value: Value of the document
        current_user: Current authenticated user

    Returns:
        List of states with stamp duty amounts
    """
    try:
        # Validate document value
        if document_value < 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Document value must be non-negative"
            )

        # Get all states
        states = stamp_duty_service.get_all_states()

        # Calculate stamp duty for each state
        comparisons = []
        for state in states:
            rate = stamp_duty_service.get_stamp_duty_rate(state, doc_type)
            if rate is not None:
                stamp_duty_amount = stamp_duty_service.calculate_stamp_duty(
                    state, doc_type, document_value
                )
                comparisons.append({
                    "state": state.replace("_", " ").title(),
                    "state_code": state,
                    "rate": rate,
                    "stamp_duty_amount": stamp_duty_amount,
                    "total_amount": document_value + stamp_duty_amount,
                    "is_taxable": rate > 0
                })

        # Sort by stamp duty amount (lowest first)
        comparisons.sort(key=lambda x: x["stamp_duty_amount"])

        return {
            "success": True,
            "data": {
                "document_type": doc_type.replace("_", " ").title(),
                "document_value": document_value,
                "comparisons": comparisons,
                "total": len(comparisons),
                "lowest": comparisons[0] if comparisons else None,
                "highest": comparisons[-1] if comparisons else None
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to compare states: {str(e)}"
        )


@router.get("/document-types")
async def get_document_types(
    current_user: User = Depends(get_current_user)
) -> Dict[str, List[str]]:
    """
    Get list of all supported document types

    Args:
        current_user: Current authenticated user

    Returns:
        List of document types
    """
    try:
        # Get document types from first state (all states have same document types)
        first_state = stamp_duty_service.get_all_states()[0]
        rates = stamp_duty_service.get_doc_types_for_state(first_state)

        # Format document types for display
        document_types = []
        for doc_type in rates.keys():
            formatted_doc_type = doc_type.replace("_", " ").title()
            document_types.append({
                "code": doc_type,
                "name": formatted_doc_type
            })

        return {
            "success": True,
            "data": {
                "document_types": document_types,
                "total": len(document_types)
            }
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get document types: {str(e)}"
        )
