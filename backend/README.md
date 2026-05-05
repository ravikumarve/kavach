# Kavach Backend API

FastAPI backend for Kavach - AI Legal Document Engine for India.

## Features

- RESTful API with FastAPI
- JWT-based authentication
- PostgreSQL database with SQLAlchemy ORM
- AI-powered document generation using Groq API
- PDF generation with WeasyPrint
- India-specific legal clause library
- State-wise stamp duty calculation
- Razorpay payment integration

## Tech Stack

- **Framework**: FastAPI 0.104.1
- **Database**: PostgreSQL with SQLAlchemy 2.0.23
- **Authentication**: JWT with python-jose
- **AI Engine**: Groq API (llama-3.3-70b-versatile)
- **PDF Generation**: WeasyPrint 59.0
- **Payment**: Razorpay 1.4.0
- **Python**: 3.11+

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kavach.git
   cd kavach/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Set up database**
   ```bash
   # Create PostgreSQL database
   createdb kavach
   
   # Run migrations
   alembic upgrade head
   ```

6. **Run the server**
   ```bash
   uvicorn main:app --reload --port 8000
   ```

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Project Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── config.py               # Configuration and settings
├── database.py             # Database configuration
├── models/                 # SQLAlchemy models
│   ├── user.py
│   ├── document.py
│   ├── template.py
│   └── subscription.py
├── routers/                # API routers
│   ├── auth.py
│   ├── documents.py
│   ├── templates.py
│   ├── generate.py
│   ├── export.py
│   └── billing.py
├── services/               # Business logic
│   ├── ai_engine.py
│   ├── pdf_service.py
│   ├── clause_library.py
│   └── stamp_duty.py
├── prompts/                # AI prompts
│   ├── base_system.txt
│   ├── nda.txt
│   ├── freelance_contract.txt
│   └── ...
└── tests/                  # Test files
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user

### Documents
- `GET /documents/` - List user's documents
- `GET /documents/{id}` - Get document details
- `DELETE /documents/{id}` - Delete document

### Templates
- `GET /templates/` - List available templates
- `GET /templates/{doc_type}/fields` - Get template fields

### Generation
- `POST /generate/` - Generate document
- `POST /generate/refine` - Refine document

### Export
- `POST /export/pdf/{document_id}` - Export as PDF
- `POST /export/docx/{document_id}` - Export as DOCX

### Billing
- `POST /billing/create-order` - Create Razorpay order
- `POST /billing/verify-payment` - Verify payment
- `GET /billing/plans` - Get available plans

## Environment Variables

See `.env.example` for required environment variables:

- `DATABASE_URL` - PostgreSQL connection string
- `GROQ_API_KEY` - Groq API key
- `JWT_SECRET` - JWT secret key
- `RAZORPAY_KEY_ID` - Razorpay key ID
- `RAZORPAY_SECRET` - Razorpay secret

## Development

### Run tests
```bash
pytest
```

### Run tests with coverage
```bash
pytest --cov
```

### Create migration
```bash
alembic revision --autogenerate -m "description"
```

### Apply migration
```bash
alembic upgrade head
```

## Deployment

### Render (Recommended)
1. Connect your GitHub repository
2. Set environment variables in Render dashboard
3. Deploy

### Docker
```bash
docker build -t kavach-backend .
docker run -p 8000:8000 kavach-backend
```

## License

MIT License - see LICENSE file for details.
