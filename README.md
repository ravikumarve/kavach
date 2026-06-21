<p align="center">
  <img src="https://img.shields.io/badge/Kavach-AI%20Legal%20Docs-indigo?style=for-the-badge" alt="Kavach">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/license-Proprietary-red?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/status-Development%20Ready-success?style=for-the-badge" alt="Status">
</p>

<p align="center">
  <strong>Your legal shield, drafted in seconds.</strong><br>
  AI-powered legal document engine for Indian MSMEs, freelancers, CAs & boutique law firms.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#usage">Usage</a> •
  <a href="#api">API</a> •
  <a href="#roadmap">Roadmap</a>
</p>

<br>

---

## 📖 Overview

Kavach democratizes access to professional legal documents for Indian businesses. Built for speed and India-specific compliance — generate NDAs, rent agreements, service contracts, and more in minutes, not days.

**Why Kavach?**
- ⚡ **Speed** — Documents in 2 minutes, not 2 days
- 🎯 **Accuracy** — India-specific legal clauses built-in
- 💰 **Affordability** — Plans starting at ₹749/month
- ✅ **Compliance** — Stamp duty guidance & GST clauses included
- 🔓 **Convenience** — 24/7 availability, no lawyer needed

---

## ✨ Features

### 🚀 Document Generation

**8 Document Types:**
<table>
<tr>
<td>Non-Disclosure Agreement (NDA)</td>
<td>Freelance Contract</td>
<td>Rent Agreement</td>
</tr>
<tr>
<td>Vendor Agreement</td>
<td>Offer Letter</td>
<td>Partnership Deed</td>
</tr>
<tr>
<td>Service Agreement</td>
<td colspan="2">Consultant Agreement</td>
</tr>
</table>

### 🤖 AI-Powered Engine

| Capability | Detail |
|------------|--------|
| **Primary AI** | Groq API — llama-3.3-70b-versatile |
| **Backup AI** | NVIDIA NIM — meta/llama-3.3-70b-instruct |
| **Fallback** | Automatic: Groq → NVIDIA NIM → Backup |
| **Smart Forms** | Dynamic fields per document type |
| **Live Preview** | In-browser HTML preview during editing |
| **Refinement** | AI-assisted editing & improvement |
| **Clause Library** | 50+ India-specific legal clauses |

### 🇮🇳 India-Specific Features

- 🏛️ **Stamp Duty Calculator** — State-wise rates for 14 states with comparison
- 📋 **GST Clause Automation** — Forward & reverse charge scenarios
- 🛡️ **MSME Protection** — Payment protection under MSME Development Act
- ⚖️ **Arbitration Clauses** — Arbitration and Conciliation Act 1996 compliant
- 🔐 **Data Protection** — DPDP Act 2023 references
- 📍 **Jurisdiction Selection** — State-specific legal provisions

### 📄 Export & Sharing

- **PDF Export** — Professional output with watermarking (free tier watermarked)
- **DOCX Export** — Editable Word documents
- **Bulk Export** — Multiple documents at once
- **Secure Sharing** — Share with clients
- **Version History** — Track document changes

### 📊 Dashboard & Analytics

- **Personalized Dashboard** — Behavior-based content
- **Usage Tracking** — Monitor document generation
- **Activity Feed** — Real-time updates
- **Compliance Calendar** — Track deadlines
- **Analytics** — Insights & reporting

### 🎨 UI & Theme

- **Slate Dark Theme** — Deep dark (#0a0a12) with indigo accent (#6366F1)
- **Professional Landing Page** — Hero, features, pricing, CTA
- **Custom Signout Page** — Dark-themed confirmation
- **Responsive Design** — Mobile-friendly throughout

### 💳 Subscription Plans

| Plan | Price | Docs/Mo | Features |
|------|-------|---------|----------|
| **Free** | ₹0 | 3 | Basic types, PDF export |
| **Starter** | ₹749/mo | 20 | All types, GST clauses, PDF + DOCX |
| **Pro** | ₹1,499/mo | Unlimited | Everything + clause editor, stamp duty |
| **Agency** | ₹3,999/mo | Unlimited | White-label, client accounts, API access |

---

## 🛠 Tech Stack

<table>
<tr>
<th>Layer</th>
<th>Technology</th>
</tr>
<tr>
<td><strong>Backend</strong></td>
<td>FastAPI (Python 3.11+) · SQLAlchemy 2.0+ · PostgreSQL 15+</td>
</tr>
<tr>
<td><strong>Frontend</strong></td>
<td>Next.js 14 (App Router) · TypeScript 5+ · Tailwind CSS 3.3+</td>
</tr>
<tr>
<td><strong>UI</strong></td>
<td>shadcn/ui (Radix UI) · Framer Motion 10+ · React Hook Form 7+ · Zod 3+</td>
</tr>
<tr>
<td><strong>Auth</strong></td>
<td>NextAuth.js 4 · JWT · Argon2 password hashing</td>
</tr>
<tr>
<td><strong>AI</strong></td>
<td>Groq API (llama-3.3-70b) · NVIDIA NIM API (backup)</td>
</tr>
<tr>
<td><strong>Payments</strong></td>
<td>Razorpay Python SDK 1.4+</td>
</tr>
<tr>
<td><strong>Export</strong></td>
<td>WeasyPrint (PDF) · python-docx (DOCX)</td>
</tr>
<tr>
<td><strong>Data Fetching</strong></td>
<td>SWR 2.2+ · React Context + hooks</td>
</tr>
<tr>
<td><strong>Testing</strong></td>
<td>pytest (back-end) · Jest + Playwright (frontend)</td>
</tr>
<tr>
<td><strong>Infra</strong></td>
<td>Vercel (frontend) · Render (backend + DB) · GitHub Actions (CI/CD)</td>
</tr>
</table>

---

## 📦 Quick Start

### Prerequisites
- Python 3.11+, Node.js 18+, PostgreSQL 15+

### Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # edit with your API keys
alembic upgrade head
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local    # edit as needed
npm run dev                   # → http://localhost:3000
```

### Environment Variables

**Backend `.env`** — `DATABASE_URL`, `GROQ_API_KEY`, `NVIDIA_NIM_API_KEY`, `JWT_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_SECRET`, `NEXTAUTH_SECRET`

**Frontend `.env.local`** — `NEXT_PUBLIC_API_URL`, `NEXTAUTH_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`

---

## 🚀 Usage

### Getting Started

1. **Register** — Visit `http://localhost:3000` → Sign Up → Verify email
2. **Generate** — Dashboard → Generate Document → Select type → Fill form → Preview & Download
3. **Explore** — Templates library, Document management, Settings, Upgrade plan

### Document Flow

```
Select Type → Fill Smart Form → AI Generates → Preview & Refine → Export (PDF/DOCX)
```

---

## 📡 API

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/api/v1/auth/register` | Register user |
| `POST` | `/api/v1/auth/login` | Login |
| `POST` | `/api/v1/generate/` | Generate AI document |
| `GET` | `/api/v1/documents` | List documents |
| `POST` | `/api/v1/export/pdf/{id}` | Export PDF |
| `POST` | `/api/v1/export/docx/{id}` | Export DOCX |
| `GET` | `/api/v1/stamp-duty/calculate` | Calculate stamp duty |
| `GET` | `/api/v1/clauses` | Browse clause library |
| `GET` | `/api/v1/templates` | List templates |
| `POST` | `/api/v1/billing/create-order` | Create Razorpay order |

### Generate a Document

```bash
curl -X POST http://localhost:8000/api/v1/generate/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "doc_type": "nda",
    "party_a": {"name": "Acme Corp", "type": "company", "state": "maharashtra"},
    "party_b": {"name": "John Doe", "type": "individual", "state": "karnataka"},
    "document_details": {"confidentiality_period": "2 years", "jurisdiction": "maharashtra"}
  }'
```

**API Docs:** Swagger UI at `http://localhost:8000/docs` · ReDoc at `http://localhost:8000/redoc`

---

## 💻 Development

### Project Structure

```
kavach/
├── backend/
│   ├── main.py               # FastAPI entry point
│   ├── config.py             # Settings & environment
│   ├── database.py           # SQLAlchemy engine + session
│   ├── models/               # User, Document, Template, Subscription
│   ├── routers/              # auth, documents, generate, export, billing, clauses, stamp_duty, templates
│   ├── services/             # ai_engine, pdf_service, clause_library, stamp_duty
│   ├── prompts/              # 8 document-specific AI system prompts
│   └── requirements.txt
├── frontend/
│   ├── app/                  # Next.js 14 App Router — 14 routes
│   │   ├── (auth)/           # login, register
│   │   ├── (dashboard)/      # dashboard, documents, create, templates, billing, settings, help, clauses, stamp-duty
│   │   └── auth/signout/     # custom signout
│   ├── components/           # shadcn/ui (9) + custom (StatCard, DocumentCard, Sidebar, TopBar, Providers)
│   ├── lib/                  # utilities
│   ├── types/                # TypeScript definitions
│   └── styles/               # globals.css
├── docs/                     # Market research, PRD, architecture, UX/UI, business model, dashboard research, implementation plan
├── .github/                  # CI/CD workflows (6), issue templates
├── docker-compose.yml        # PostgreSQL 15
├── AGENTS.md                 # Build ledger & session memory
└── README.md
```

### Commands

```bash
# Backend tests
cd backend && pytest
pytest --cov=.                # with coverage
pytest tests/test_auth.py -v  # specific test

# Frontend tests
cd frontend && npm test
npm test -- --coverage        # with coverage
npx playwright test           # E2E tests

# Database migrations
cd backend && alembic revision --autogenerate -m "description"
cd backend && alembic upgrade head
```

### Code Style

- **Backend:** PEP 8 · Type hints · Docstrings · 100 char line limit
- **Frontend:** ESLint · Functional components · Hooks · 100 char line limit

---

## 🧪 Testing

| Layer | Framework | Target Coverage |
|-------|-----------|-----------------|
| Backend API | pytest + pytest-asyncio | >80% overall, 100% critical paths |
| Frontend | Jest + React Testing Library | >80% overall |
| E2E | Playwright | Key user flows |

Test suites cover: auth, documents, generation, export, billing, clauses, stamp duty, and public endpoints.

---

## 🚢 Deployment

### CI/CD Pipeline (GitHub Actions)

| Workflow | Trigger | Actions |
|----------|---------|---------|
| **CI** | Every push/PR | pytest + Jest + coverage + security scan + build |
| **CD Backend** | Push to `main` | Tests → Deploy to Render |
| **CD Frontend** | Push to `main` | Lint → Test → Deploy to Vercel |
| **DB Migrations** | Manual | Run Alembic migrations |
| **Health Check** | Every hour | Backend + frontend + DB check |
| **Dependency Update** | Every Monday | Python + Node deps → PR |

```bash
# Manual deployment
vercel --prod                 # Frontend
render deploy backend         # Backend
```

### Production Checklist

- [ ] Set up production PostgreSQL
- [ ] Configure production API keys (Groq, NVIDIA, Razorpay)
- [ ] Enable SSL certificates
- [ ] Set up monitoring (Sentry, Vercel Analytics)
- [ ] Configure custom domain

---

## 📊 Documentation

| Document | Description |
|----------|-------------|
| [Market Research Report](docs/MARKET_RESEARCH_REPORT.md) | TAM/SAM/SOM, competitor analysis, personas |
| [PRD](docs/PRD.md) | Product requirements & user stories |
| [Technical Architecture Review](docs/TECHNICAL_ARCHITECTURE_REVIEW.md) | System design & scalability |
| [UX/UI Design Review](docs/UX_UI_DESIGN_REVIEW.md) | Design system & accessibility |
| [Business Model Validation](docs/BUSINESS_MODEL_VALIDATION.md) | Pricing & unit economics |
| [Dashboard Market Research](docs/DASHBOARD_MARKET_RESEARCH_REPORT.md) | Competitive dashboard analysis |
| [Implementation Plan](docs/IMPLEMENTATION_PLAN.md) | 18-week roadmap |

---

## 🗺 Roadmap

### ✅ Q2 2026 — Complete
- Pre-development (market research → implementation plan)
- **Phase 1:** Full backend + frontend foundation, auth, DB, CI/CD
- **Phase 2:** AI generation pipeline, export (PDF/DOCX), clause library, stamp duty calculator, Razorpay billing, Slate Dark theme, landing page, 14 frontend routes

### 🎯 Q3 2026
- MVP launch with 8 document types
- Replace placeholder Razorpay keys & go live
- Mobile-responsive design polish
- User onboarding & support

### 🎯 Q4 2026
- Advanced AI features
- Multi-language support (Hindi)
- Mobile apps (iOS/Android)
- API access for developers

### 🎯 Q1 2027
- White-label solutions
- Enterprise features
- Advanced collaboration tools
- Legal consultation integration

---

## 📈 Metrics & Progress

| Phase | Status |
|-------|--------|
| Pre-Development (7 phases) | ✅ 100% |
| Phase 1 — Foundation & Setup | ✅ 100% |
| Phase 2 — Core Features | ✅ 100% |
| Phase 3 — Testing & QA | ✅ 100% |
| Production Deployment | ⏸️ Blocked on Razorpay keys |

### Target Metrics (Post-Launch)

| Metric | Target |
|--------|--------|
| Users (Month 1) | 1,000 |
| Documents Generated (Month 1) | 5,000 |
| Conversion Rate (Month 3) | 15% |
| MRR (Month 3) | ₹100,000 |
| Monthly Churn | <5% |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes — write tests, update docs
4. Ensure all tests pass
5. Commit (`git commit -m "feat: add amazing feature"`)
6. Push and create a Pull Request

**All PRs require:** passing tests, code review by maintainer, linked issue, documentation updates.

---

## 📜 License

**Proprietary** — All rights reserved. © 2026 Kavach Legal Technologies Pvt. Ltd.

---

## 📞 Contact

| | |
|---|---|
| **Support** | support@kavachlegal.com |
| **Business** | business@kavachlegal.com |
| **Website** | https://kavachlegal.com |

**Office:** Kavach Legal Technologies Pvt. Ltd., 123 Innovation Hub, Tech Park, Bangalore, Karnataka 560001, India

---

## 🙏 Acknowledgments

**Groq** · **NVIDIA** · **Vercel** · **Render** · **shadcn/ui** · **Tailwind CSS** · **Radix UI**

---

<p align="center">
  Built with ❤️ for India<br>
  <sub><a href="#kavach---ai-legal-document-engine-for-india">⬆ Back to Top</a></sub>
</p>
