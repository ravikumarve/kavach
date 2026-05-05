# Kavach - AI Legal Document Engine for India

<div align="center">

![Kavach Logo](https://img.shields.io/badge/Kavach-AI%20Legal%20Docs-purple?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-Proprietary-red?style=for-the-badge)
![Status](https://img.shields.io/badge/status-Development%20Ready-success?style=for-the-badge)

**Your legal shield, drafted in seconds.**

[Features](#features) • [Tech Stack](#tech-stack) • [Installation](#installation) • [Usage](#usage) • [Development](#development) • [Contributing](#contributing)

</div>

---

## 📖 Overview

Kavach is an AI-powered legal document engine designed specifically for the Indian market. It enables MSMEs, freelancers, CAs, and boutique law firms to generate India-law-ready legal documents in minutes, not days.

### 🎯 Mission

Democratize access to professional legal documents for Indian businesses by combining AI-powered generation with India-specific legal expertise.

### 🌟 Vision

Become the go-to platform for legal document generation in India, serving over 100,000 businesses by 2027.

### 💡 Key Value Propositions

- **Speed:** Generate documents in 2 minutes, not 2 days
- **Accuracy:** India-specific legal clauses built-in
- **Affordability:** Plans starting at ₹749/month
- **Compliance:** Stamp duty guidance and GST clauses included
- **Convenience:** 24/7 availability, no lawyer needed

---

## ✨ Features

### 🚀 Core Features

#### Document Generation
- **8 Document Types:**
  - Non-Disclosure Agreement (NDA)
  - Freelance Contract
  - Rent Agreement
  - Vendor Agreement
  - Offer Letter
  - Partnership Deed
  - Service Agreement
  - Consultant Agreement

#### AI-Powered Engine
- **Groq API Integration:** Uses llama-3.3-70b-versatile model (primary)
- **NVIDIA NIM API Integration:** meta/llama-3.3-70b-instruct (testing/backup)
- **Automatic Fallback:** Groq → NVIDIA NIM → NVIDIA NIM Backup
- **Smart Form Builder:** Dynamic forms based on document type
- **Real-time Preview:** Live document preview as you type
- **Document Refinement:** AI-assisted editing and improvement
- **Clause Library:** 50+ India-specific legal clauses

#### India-Specific Features
- **Stamp Duty Calculator:** State-wise stamp duty guidance
- **GST Clause Automation:** Forward and reverse charge scenarios
- **MSME Protection:** Payment protection under MSME Development Act
- **Arbitration Clauses:** Arbitration and Conciliation Act 1996 compliant
- **Data Protection:** DPDP Act 2023 references
- **Jurisdiction Selection:** State-specific legal provisions

#### Export & Sharing
- **PDF Export:** Professional PDF with watermarking
- **DOCX Export:** Editable Word documents
- **Bulk Export:** Export multiple documents at once
- **Document Sharing:** Secure sharing with clients
- **Version History:** Track document changes

#### Dashboard & Analytics
- **Personalized Dashboard:** Behavior-based content
- **Usage Tracking:** Monitor document generation
- **Activity Feed:** Real-time activity updates
- **Compliance Calendar:** Track important deadlines
- **Analytics Dashboard:** Insights and reporting

### 💳 Subscription Plans

| Plan | Price | Documents/Month | Features |
|------|-------|-----------------|----------|
| **Free** | ₹0 | 3 | Basic document types, PDF export only |
| **Starter** | ₹749/mo | 20 | All document types, GST clauses, PDF + DOCX |
| **Pro** | ₹1,499/mo | Unlimited | Everything + clause editor, stamp duty calc |
| **Agency** | ₹3,999/mo | Unlimited | Everything + white-label, client accounts, API access |

---

## 🛠 Tech Stack

### Backend
- **Framework:** FastAPI (Python 3.11+)
- **Database:** PostgreSQL 15+
- **ORM:** SQLAlchemy 2.0+
- **Authentication:** JWT with NextAuth.js
- **AI Engine:** Groq API (llama-3.3-70b-versatile) + NVIDIA NIM API (backup)
- **PDF Generation:** WeasyPrint
- **DOCX Generation:** python-docx
- **Payment:** Razorpay Python SDK
- **Testing:** pytest, pytest-asyncio

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5+
- **UI Library:** shadcn/ui (Radix UI + Tailwind)
- **Styling:** Tailwind CSS 3.3+
- **State Management:** React Context + hooks
- **Data Fetching:** SWR 2.2+
- **Animations:** Framer Motion 10+
- **Forms:** React Hook Form 7+
- **Validation:** Zod 3+
- **Testing:** Jest, React Testing Library, Playwright

### Infrastructure
- **Hosting:** Vercel (frontend), Render (backend)
- **Database:** Render PostgreSQL
- **CDN:** Vercel Edge Network
- **Monitoring:** Sentry, Vercel Analytics
- **CI/CD:** GitHub Actions
- **Version Control:** Git

---

## 📦 Installation

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Redis (optional, for caching)

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
alembic upgrade head

# Start development server
uvicorn main:app --reload --port 8000
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

### Environment Variables

**Backend (.env):**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/kavach
GROQ_API_KEY=your_groq_api_key
NVIDIA_NIM_API_KEY=your_nvidia_nim_api_key
NVIDIA_NIM_API_URL=https://integrate.api.nvidia.com/v1/chat/completions
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret
NEXTAUTH_SECRET=your_nextauth_secret
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

## 🚀 Usage

### Getting Started

1. **Register an Account**
   - Visit `http://localhost:3000`
   - Click "Sign Up"
   - Fill in your details
   - Verify your email

2. **Generate Your First Document**
   - Navigate to Dashboard
   - Click "Generate Document"
   - Select document type
   - Fill in the form
   - Preview and download

3. **Explore Features**
   - Browse templates in Templates Library
   - Manage documents in Document Library
   - Track usage in Settings
   - Upgrade plan when needed

### Document Generation Flow

```
1. Select Document Type
   ↓
2. Fill Smart Form
   ↓
3. AI Generates Document
   ↓
4. Preview & Refine
   ↓
5. Export (PDF/DOCX)
```

### API Usage

#### Generate Document
```bash
POST /api/v1/generate/
Content-Type: application/json
Authorization: Bearer <token>

{
  "doc_type": "nda",
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

#### Export PDF
```bash
POST /api/v1/export/pdf/{document_id}
Authorization: Bearer <token>
```

---

## 💻 Development

### Project Structure

```
kavach/
├── backend/
│   ├── main.py                  # FastAPI app entry
│   ├── config.py                # Settings, env vars
│   ├── database.py              # SQLAlchemy engine + session
│   ├── models/
│   │   ├── user.py
│   │   ├── document.py
│   │   ├── template.py
│   │   └── subscription.py
│   ├── routers/
│   │   ├── auth.py
│   │   ├── documents.py
│   │   ├── templates.py
│   │   ├── generate.py
│   │   ├── export.py
│   │   └── billing.py
│   ├── services/
│   │   ├── ai_engine.py
│   │   ├── pdf_service.py
│   │   ├── clause_library.py
│   │   └── stamp_duty.py
│   ├── prompts/
│   │   ├── base_system.txt
│   │   ├── nda.txt
│   │   ├── freelance_contract.txt
│   │   └── ...
│   └── requirements.txt
│
 ├── frontend/
 │   ├── app/
 │   │   ├── layout.tsx
 │   │   ├── page.tsx
 │   │   ├── (auth)/
 │   │   │   ├── login/page.tsx
 │   │   │   └── register/page.tsx
 │   │   ├── (dashboard)/
 │   │   │   ├── layout.tsx
 │   │   │   ├── dashboard/page.tsx
 │   │   │   ├── documents/page.tsx
 │   │   │   ├── create/page.tsx
 │   │   │   ├── templates/page.tsx
 │   │   │   ├── billing/page.tsx
 │   │   │   ├── settings/page.tsx
 │   │   │   └── help/page.tsx
 │   │   └── api/
 │   │       └── auth/
 │   │           └── [...nextauth]/route.ts
 │   ├── components/
 │   │   ├── ui/
 │   │   │   ├── button.tsx
 │   │   │   ├── card.tsx
 │   │   │   ├── input.tsx
 │   │   │   ├── label.tsx
 │   │   │   ├── select.tsx
 │   │   │   ├── textarea.tsx
 │   │   │   ├── dialog.tsx
 │   │   │   ├── dropdown-menu.tsx
 │   │   │   └── avatar.tsx
 │   │   ├── stat-card.tsx
 │   │   ├── document-card.tsx
 │   │   ├── sidebar.tsx
 │   │   └── top-bar.tsx
 │   ├── lib/
 │   │   └── utils.ts
 │   ├── types/
 │   │   ├── document.ts
 │   │   └── next-auth.d.ts
 │   └── styles/
 │       └── globals.css
│
├── docs/
│   ├── MARKET_RESEARCH_REPORT.md
│   ├── PRD.md
│   ├── TECHNICAL_ARCHITECTURE_REVIEW.md
│   ├── UX_UI_DESIGN_REVIEW.md
│   ├── BUSINESS_MODEL_VALIDATION.md
│   ├── DASHBOARD_MARKET_RESEARCH_REPORT.md
│   └── IMPLEMENTATION_PLAN.md
│
├── AGENTS.md
└── README.md
```

### Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write code following project standards
   - Add tests for new functionality
   - Update documentation

3. **Run Tests**
   ```bash
   # Backend tests
   cd backend
   pytest

   # Frontend tests
   cd frontend
   npm test
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create pull request on GitHub
   ```

### Code Style

**Backend (Python):**
- Follow PEP 8 guidelines
- Use type hints
- Write docstrings for functions
- Maximum line length: 100 characters

**Frontend (TypeScript):**
- Follow ESLint rules
- Use functional components
- Use hooks for state management
- Maximum line length: 100 characters

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
pytest

# Run with coverage
pytest --cov=.

# Run specific test file
pytest tests/test_auth.py

# Run with verbose output
pytest -v
```

### Frontend Tests

```bash
cd frontend

# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- DocumentCard.test.tsx

# Run end-to-end tests
npx playwright test
```

### Test Coverage

- **Target:** >80% code coverage
- **Critical Paths:** 100% coverage
- **API Endpoints:** 100% coverage

---

## 🚢 Deployment

### Backend Deployment (Render)

```bash
# Install Render CLI
npm install -g render-cli

# Login to Render
render login

# Deploy backend
render deploy backend
```

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy frontend
vercel --prod
```

### Environment Setup

**Production Environment Variables:**
- Set up production database
- Configure production API keys
- Enable SSL certificates
- Set up monitoring and alerting

---

## 📊 Documentation

### Project Documentation

- [Market Research Report](docs/MARKET_RESEARCH_REPORT.md)
- [Product Requirements Document](docs/PRD.md)
- [Technical Architecture Review](docs/TECHNICAL_ARCHITECTURE_REVIEW.md)
- [UX/UI Design Review](docs/UX_UI_DESIGN_REVIEW.md)
- [Business Model Validation](docs/BUSINESS_MODEL_VALIDATION.md)
- [Dashboard Market Research](docs/DASHBOARD_MARKET_RESEARCH_REPORT.md)
- [Implementation Plan](docs/IMPLEMENTATION_PLAN.md)

### API Documentation

- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Contribution Guidelines

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests**
5. **Ensure all tests pass**
6. **Submit a pull request**

### Code Review Process

1. All PRs must be reviewed by at least one maintainer
2. Tests must pass
3. Code must follow project style guidelines
4. Documentation must be updated
5. PR must be linked to an issue

### Issue Reporting

When reporting issues, please include:
- Description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details
- Screenshots (if applicable)

---

## 📜 License

Proprietary - All rights reserved

© 2026 Kavach. All rights reserved.

---

## 📞 Contact

### Support

- **Email:** support@kavachlegal.com
- **Website:** https://kavachlegal.com
- **Twitter:** [@kavachlegal](https://twitter.com/kavachlegal)

### Business Inquiries

- **Email:** business@kavachlegal.com
- **Phone:** +91 98765 43210

### Office Address

Kavach Legal Technologies Pvt. Ltd.
123 Innovation Hub, Tech Park
Bangalore, Karnataka 560001
India

---

## 🙏 Acknowledgments

- **Groq** - AI API for document generation
- **NVIDIA** - NIM API for AI model inference
- **Vercel** - Frontend hosting platform
- **Render** - Backend hosting platform
- **shadcn/ui** - UI component library
- **Tailwind CSS** - Styling framework

---

## 🗺 Roadmap

### Q2 2026 (Current)
- ✅ Market research and competitive analysis
- ✅ Product requirements and technical architecture
- ✅ UX/UI design and business model validation
- ✅ Dashboard research and implementation plan
- 🔄 Development implementation - Phase 1 (95% complete)
  - ✅ Backend foundation (FastAPI, models, routers, services)
  - ✅ Frontend foundation (Next.js, shadcn/ui components)
  - ✅ Authentication system (NextAuth.js)
  - ✅ Dashboard pages and components
  - ✅ PostgreSQL database setup (Docker)
  - ✅ Database migrations execution
  - ✅ Document generation features (7 pages with smart forms)
  - ✅ Document management interface
  - ✅ Template library
  - ✅ Billing and subscription management
  - ✅ Account settings
  - ✅ Help center
  - ⏳ CI/CD pipeline

### Q3 2026
- 🎯 MVP launch with 8 document types
- 🎯 Razorpay payment integration
- 🎯 Mobile-responsive design
- 🎯 User onboarding and support

### Q4 2026
- 🎯 Advanced AI features
- 🎯 Multi-language support (Hindi)
- 🎯 Mobile apps (iOS/Android)
- 🎯 API access for developers

### Q1 2027
- 🎯 White-label solutions
- 🎯 Enterprise features
- 🎯 Advanced collaboration tools
- 🎯 Legal consultation integration

---

## 📈 Metrics

### Development Progress

- **Pre-Development Phase:** 100% Complete ✅
- **Development Phase (Phase 1):** 95% Complete 🟡
- **Testing Phase:** 0% Complete ⏸️
- **Launch Phase:** 0% Complete ⏸️

### Phase 1 Progress (Foundation & Setup)

**Completed:**
- ✅ Backend structure creation (FastAPI, models, routers, services)
- ✅ Frontend structure creation (Next.js, components, pages)
- ✅ Database models implementation (User, Document, Template, Subscription)
- ✅ API routers implementation (auth, documents, templates, generate, export, billing)
- ✅ Backend services implementation (AI engine, PDF service, clause library, stamp duty)
- ✅ AI prompts creation (8 document-specific prompts)
- ✅ Configuration files setup (requirements.txt, .env.example)
- ✅ Documentation creation (README, AGENTS.md)
- ✅ Alembic migrations setup
- ✅ Frontend dependencies installation
- ✅ Authentication system implementation (NextAuth.js)
- ✅ Dashboard pages creation
- ✅ shadcn/ui components creation (9 components)
- ✅ Custom Kavach components creation (StatCard, DocumentCard, Sidebar, TopBar)
- ✅ PostgreSQL database setup (Docker container)
- ✅ Database migrations execution (all tables created)
- ✅ Document generation pages (7 pages with smart forms and preview)
- ✅ Document management interface (filtering, search, actions)
- ✅ Template library with categories
- ✅ Billing and subscription management
- ✅ Account settings page
- ✅ Help center with FAQ

**Remaining:**
- ⏳ CI/CD pipeline setup

### Target Metrics (Post-Launch)

- **Users:** 1,000 in Month 1
- **Documents Generated:** 5,000 in Month 1
- **Conversion Rate:** 15% by Month 3
- **Revenue:** ₹100,000 MRR by Month 3
- **Churn Rate:** <5% monthly

---

<div align="center">

**Built with ❤️ for India**

[⬆ Back to Top](#kavach---ai-legal-document-engine-for-india)

</div>