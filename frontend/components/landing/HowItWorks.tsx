const STEPS = [
  {
    num: "01",
    title: "Fill the Smart Form",
    desc: "Select your document type and fill in the dynamic form. Kavach adapts fields based on your document, state, and parties involved.",
  },
  {
    num: "02",
    title: "AI Generates & Refines",
    desc: "Groq's Llama-3 engine drafts your document in seconds. Preview live in-browser, refine clauses, and adjust terms with AI assistance.",
  },
  {
    num: "03",
    title: "Export & Share",
    desc: "Download as professional PDF or editable DOCX. Share securely with clients or counterparties for digital signing.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="container mx-auto max-w-[1240px] px-8 py-32">
      <div className="mx-auto mb-20 max-w-[700px] text-center">
        <h2 className="mb-5 text-[3.2rem] font-semibold tracking-[-0.04em]">
          How it <span className="text-indigo-500 [text-shadow:0_0_20px_rgba(99,102,241,0.4)]">works.</span>
        </h2>
        <p className="text-lg font-light leading-relaxed text-slate-400">
          Three simple steps to generate a legally sound document — no lawyer required.
        </p>
      </div>

      <div className="steps-grid">
        {STEPS.map((step, i) => (
          <div key={step.num} className="step-card">
            <div className="step-num">{step.num}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .step-card {
          background: #0a0a12;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 3rem 2.5rem;
          text-align: center;
          position: relative;
          transition: all 0.4s;
        }

        .step-card:hover {
          border-color: rgba(99, 102, 241, 0.25);
          transform: translateY(-4px);
        }

        .step-num {
          font-family: "JetBrains Mono", monospace;
          font-size: 3rem;
          font-weight: 700;
          color: rgba(99, 102, 241, 0.15);
          line-height: 1;
          margin-bottom: 1.5rem;
        }

        .step-card h3 {
          font-size: 1.3rem;
          margin-bottom: 0.75rem;
          color: #ffffff;
          font-weight: 600;
          letter-spacing: -0.04em;
          line-height: 1.1;
        }

        .step-card p {
          color: #94a3b8;
          font-size: 0.95rem;
          line-height: 1.6;
          font-weight: 300;
        }

        @media (max-width: 1024px) {
          .steps-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .steps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
