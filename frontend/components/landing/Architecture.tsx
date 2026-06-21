const STACK_ITEMS = [
  { label: "Backend Engine", value: "FastAPI (Python 3.11+)" },
  { label: "Database", value: "PostgreSQL 15+ & SQLAlchemy 2.0" },
  { label: "Frontend App", value: "Next.js 14 (App Router)" },
  { label: "UI Primitives", value: "shadcn/ui + Tailwind CSS" },
  { label: "Authentication", value: "NextAuth.js 4 + Argon2" },
  { label: "Payment Gateway", value: "Razorpay SDK 1.4+" },
  { label: "Export Engines", value: "WeasyPrint + python-docx" },
]

const API_ROUTES = [
  { method: "POST", path: "/api/v1/generate/", color: "#10B981", group: "Document Generation" },
  { method: "GET", path: "/api/v1/documents", color: "#3b82f6", group: "Document Generation" },
  { method: "POST", path: "/api/v1/export/pdf/{id}", color: "#10B981", group: "Document Generation" },
  { method: "POST", path: "/api/v1/export/docx/{id}", color: "#10B981", group: "Document Generation" },
  { method: "GET", path: "/api/v1/stamp-duty/calculate", color: "#3b82f6", group: "Legal Resources" },
  { method: "GET", path: "/api/v1/clauses", color: "#3b82f6", group: "Legal Resources" },
]

export default function Architecture() {
  return (
    <section id="architecture" className="container mx-auto max-w-[1240px] px-8 py-32">
      <div className="arch-columns">
        {/* Left: Info + Stack */}
        <div>
          <h2 className="mb-6 text-[3.2rem] font-semibold tracking-[-0.04em]">
            Full-Stack <br />
            <span className="text-indigo-500 [text-shadow:0_0_20px_rgba(99,102,241,0.4)]">
              Architecture.
            </span>
          </h2>
          <p className="mb-12 text-lg font-light leading-relaxed text-slate-400">
            Kavach is built on a high-performance Python backend and a modern
            React frontend. It achieves over 80% test coverage via Pytest and
            Jest, ensuring critical generation and billing pathways never fail.
          </p>

          <div className="stack-card">
            <h3 className="stack-card-title">Infrastructure Stack</h3>
            <ul className="stack-list">
              {STACK_ITEMS.map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <span className="stack-value">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: API Block */}
        <div className="api-block">
          <h3 className="api-block-title">Core API Routes</h3>

          <div className="api-cat">Document Generation</div>
          {API_ROUTES.filter((r) => r.group === "Document Generation").map(
            (route) => (
              <div key={route.path} className="api-row">
                <span style={{ color: route.color }}>{route.method}</span>
                <span className="api-route">{route.path}</span>
              </div>
            )
          )}

          <div className="api-cat">Legal Resources</div>
          {API_ROUTES.filter((r) => r.group === "Legal Resources").map(
            (route) => (
              <div key={route.path} className="api-row">
                <span style={{ color: route.color }}>{route.method}</span>
                <span className="api-route">{route.path}</span>
              </div>
            )
          )}

          <div className="api-cat">Inference Payload Example</div>
          <div className="code-payload">
            <span className="comment">// POST /api/v1/generate/</span>
            <br />
            {"{"}
            <br />
            &nbsp;&nbsp;<span className="key">"doc_type"</span>:{" "}
            <span className="string">"nda"</span>,<br />
            &nbsp;&nbsp;<span className="key">"party_a"</span>:{" "}
            {`{`}<span className="key">"name"</span>:{" "}
            <span className="string">"Acme Corp"</span>,{" "}
            <span className="key">"state"</span>:{" "}
            <span className="string">"maharashtra"</span>
            {`}`},<br />
            &nbsp;&nbsp;<span className="key">"document_details"</span>:{" "}
            {`{`}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="key">
              "confidentiality_period"
            </span>
            : <span className="string">"2 years"</span>
            <br />
            &nbsp;&nbsp;{`}`}
            <br />
            {"}"}
          </div>
        </div>
      </div>

      <style jsx>{`
        .arch-columns {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 5rem;
          align-items: start;
        }

        .stack-card {
          background: #020203;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 3rem;
          box-shadow: inset 0 0 50px rgba(99, 102, 241, 0.03);
        }

        .stack-card-title {
          font-size: 1.2rem;
          font-family: "JetBrains Mono", monospace;
          font-weight: 500;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          letter-spacing: 0.5px;
          color: #6366f1;
        }

        .stack-list {
          list-style: none;
        }

        .stack-list li {
          padding: 1.1rem 0;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.06);
          display: flex;
          justify-content: space-between;
          font-size: 0.95rem;
          color: #94a3b8;
          align-items: center;
        }

        .stack-list li:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .stack-value {
          color: #ffffff;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.8rem;
          background: #0a0a12;
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .api-block {
          background: #020203;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 3rem;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.85rem;
          line-height: 2;
          color: #94a3b8;
        }

        .api-block-title {
          font-size: 1.25rem;
          font-family: "JetBrains Mono", monospace;
          color: #ffffff;
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .api-cat {
          color: #475569;
          margin: 2rem 0 0.75rem;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 1px;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.06);
          padding-bottom: 0.5rem;
        }

        .api-cat:first-of-type {
          margin-top: 0;
        }

        .api-route {
          color: #ffffff;
          margin-left: 10px;
        }

        .api-row {
          margin-bottom: 1rem;
        }

        .code-payload {
          background: #0a0a12;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          margin-top: 1.5rem;
          font-size: 0.8rem;
          line-height: 1.8;
        }

        .comment {
          color: #475569;
        }
        .key {
          color: #94a3b8;
        }
        .string {
          color: #10b981;
        }

        @media (max-width: 1024px) {
          .arch-columns {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }
      `}</style>
    </section>
  )
}
