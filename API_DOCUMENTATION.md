# Kavach API Documentation

## Base URL
```
http://localhost:8000
```

## Authentication
All endpoints (except `/health` and `/`) require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Public Endpoints

### Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "service": "kavach-api",
  "version": "1.0.0",
  "environment": "development"
}
```

### Root Endpoint
```
GET /
```

**Response:**
```json
{
  "message": "Welcome to Kavach API",
  "description": "AI-powered legal document engine for India",
  "version": "1.0.0",
  "docs": "/docs",
  "health": "/health"
}
```

## Authentication Endpoints

### Register User
```
POST /api/v1/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "full_name": "John Doe",
  "company_name": "Acme Corp"
}
```

### Login
```
POST /api/v1/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "access_token": "jwt_token_here",
  "token_type": "bearer",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "full_name": "John Doe"
  }
}
```

### Get Current User
```
GET /api/v1/auth/me
```

## Document Endpoints

### Get All Documents
```
GET /api/v1/documents/
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `page_size`: Items per page (default: 20)
- `status`: Filter by status
- `doc_type`: Filter by document type

### Get Document by ID
```
GET /api/v1/documents/{document_id}
```

### Delete Document
```
DELETE /api/v1/documents/{document_id}
```

## Document Generation Endpoints

### Generate Document
```
POST /api/v1/generate/
```

**Request Body:**
```json
{
  "doc_type": "nda",
  "title": "Non-Disclosure Agreement",
  "party_a": {
    "name": "Acme Corp",
    "type": "company",
    "address": "123 Business St, Mumbai",
    "state": "maharashtra"
  },
  "party_b": {
    "name": "John Doe",
    "type": "individual",
    "address": "456 Personal Ave, Bangalore",
    "state": "karnataka"
  },
  "document_details": {
    "confidentiality_period": "2 years",
    "jurisdiction": "maharashtra",
    "include_gst": false,
    "msme_protected": false
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "document": {
      "id": "document_id",
      "title": "Non-Disclosure Agreement",
      "type": "nda",
      "status": "completed",
      "content_html": "<html>...</html>",
      "pdf_path": "/path/to/pdf",
      "created_at": "2026-05-06T00:00:00",
      "updated_at": "2026-05-06T00:00:00"
    }
  }
}
```

### Refine Document
```
POST /api/v1/generate/refine
```

**Request Body:**
```json
{
  "document_id": "document_id",
  "instruction": "Make the confidentiality period 3 years instead of 2"
}
```

### Preview Document
```
GET /api/v1/generate/preview/{document_id}
```

## Export Endpoints

### Export PDF
```
POST /api/v1/export/pdf/{document_id}
```

**Response:** PDF file download

### Export DOCX
```
POST /api/v1/export/docx/{document_id}
```

**Response:** DOCX file download

## Clause Endpoints

### Get Clause Library
```
GET /api/v1/clauses/library
```

**Response:**
```json
{
  "success": true,
  "data": {
    "clauses": {
      "gst_forward_charge": "<div>...</div>",
      "gst_reverse_charge": "<div>...</div>",
      "msme_payment_protection": "<div>...</div>",
      "arbitration_india": "<div>...</div>",
      "force_majeure_india": "<div>...</div>",
      "ip_ownership_india": "<div>...</div>",
      "non_compete_reasonable": "<div>...</div>",
      "data_protection_india": "<div>...</div>",
      "governing_law_india": "<div>...</div>",
      "stamp_duty_notice": "<div>...</div>"
    },
    "total": 10
  }
}
```

### Get Specific Clause
```
GET /api/v1/clauses/library/{clause_type}
```

### Get Recommended Clauses
```
GET /api/v1/clauses/recommended/{doc_type}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "doc_type": "nda",
    "recommended_clauses": {
      "data_protection_india": "<div>...</div>",
      "governing_law_india": "<div>...</div>",
      "arbitration_india": "<div>...</div>"
    },
    "total": 3
  }
}
```

### Add Clause to Document
```
POST /api/v1/clauses/document/{document_id}/add
```

**Request Body:**
```json
{
  "clause_type": "gst_forward_charge",
  "position": 5
}
```

### Remove Clause from Document
```
POST /api/v1/clauses/document/{document_id}/remove
```

**Request Body:**
```json
{
  "clause_type": "gst_forward_charge"
}
```

### Add Custom Clause
```
POST /api/v1/clauses/document/{document_id}/custom
```

**Request Body:**
```json
{
  "clause_title": "Custom Payment Terms",
  "clause_content": "Payment shall be made within 30 days of invoice.",
  "position": 10
}
```

### Get GST Clause
```
GET /api/v1/clauses/gst
```

**Query Parameters:**
- `is_taxable`: boolean (required)
- `is_reverse_charge`: boolean (default: false)

## Stamp Duty Endpoints

### Get All States
```
GET /api/v1/stamp-duty/states
```

**Response:**
```json
{
  "success": true,
  "data": {
    "states": [
      {
        "code": "andhra_pradesh",
        "name": "Andhra Pradesh"
      },
      {
        "code": "bihar",
        "name": "Bihar"
      },
      // ... more states
    ],
    "total": 14
  }
}
```

### Get State Rates
```
GET /api/v1/stamp-duty/states/{state}/rates
```

**Response:**
```json
{
  "success": true,
  "data": {
    "state": "Maharashtra",
    "rates": {
      "Rent Agreement": {
        "code": "rent_agreement",
        "rate": 0.25,
        "is_taxable": true
      },
      "NDA": {
        "code": "nda",
        "rate": 0,
        "is_taxable": false
      }
      // ... more document types
    },
    "total": 8
  }
}
```

### Calculate Stamp Duty
```
GET /api/v1/stamp-duty/calculate
```

**Query Parameters:**
- `state`: string (required) - State code (e.g., "maharashtra")
- `doc_type`: string (required) - Document type (e.g., "rent_agreement")
- `document_value`: float (required) - Value of the document

**Response:**
```json
{
  "success": true,
  "data": {
    "state": "Maharashtra",
    "document_type": "Rent Agreement",
    "document_value": 10000.0,
    "stamp_duty_rate": 0.25,
    "stamp_duty_amount": 25.0,
    "total_amount": 10025.0,
    "is_taxable": true,
    "currency": "INR"
  }
}
```

### Compare States
```
GET /api/v1/stamp-duty/compare
```

**Query Parameters:**
- `doc_type`: string (required) - Document type
- `document_value`: float (required) - Value of the document

**Response:**
```json
{
  "success": true,
  "data": {
    "document_type": "Rent Agreement",
    "document_value": 10000.0,
    "comparisons": [
      {
        "state": "Maharashtra",
        "state_code": "maharashtra",
        "rate": 0.25,
        "stamp_duty_amount": 25.0,
        "total_amount": 10025.0,
        "is_taxable": true
      },
      // ... more states
    ],
    "total": 14,
    "lowest": {
      "state": "Maharashtra",
      "state_code": "maharashtra",
      "rate": 0.25,
      "stamp_duty_amount": 25.0,
      "total_amount": 10025.0,
      "is_taxable": true
    },
    "highest": {
      "state": "Bihar",
      "state_code": "bihar",
      "rate": 2.0,
      "stamp_duty_amount": 200.0,
      "total_amount": 10200.0,
      "is_taxable": true
    }
  }
}
```

### Get Document Types
```
GET /api/v1/stamp-duty/document-types
```

**Response:**
```json
{
  "success": true,
  "data": {
    "document_types": [
      {
        "code": "nda",
        "name": "NDA"
      },
      {
        "code": "freelance_contract",
        "name": "Freelance Contract"
      },
      // ... more document types
    ],
    "total": 8
  }
}
```

## Template Endpoints

### Get All Templates
```
GET /api/v1/templates/
```

### Get Template by ID
```
GET /api/v1/templates/{template_id}
```

## Billing Endpoints

### Get Subscription
```
GET /api/v1/billing/subscription
```

### Create Checkout Session
```
POST /api/v1/billing/checkout
```

## Document Types

The following document types are supported:

1. `nda` - Non-Disclosure Agreement
2. `freelance_contract` - Freelance Contract
3. `rent_agreement` - Rent Agreement
4. `vendor_agreement` - Vendor Agreement
5. `offer_letter` - Offer Letter
6. `partnership_deed` - Partnership Deed
7. `service_agreement` - Service Agreement
8. `consultant_agreement` - Consultant Agreement

## States Supported

The following states are supported for stamp duty calculation:

1. `andhra_pradesh` - Andhra Pradesh
2. `bihar` - Bihar
3. `delhi` - Delhi
4. `gujarat` - Gujarat
5. `karnataka` - Karnataka
6. `kerala` - Kerala
7. `madhya_pradesh` - Madhya Pradesh
8. `maharashtra` - Maharashtra
9. `punjab` - Punjab
10. `rajasthan` - Rajasthan
11. `tamil_nadu` - Tamil Nadu
12. `telangana` - Telangana
13. `uttar_pradesh` - Uttar Pradesh
14. `west_bengal` - West Bengal

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "success": false,
  "error": "error_type",
  "message": "Detailed error message"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

- **Per Minute:** 60 requests
- **Per Hour:** 1000 requests

## Pagination

Default page size: 20 items
Maximum page size: 100 items

## API Documentation

Interactive API documentation is available at:
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`
