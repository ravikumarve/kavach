const DOC_TYPES = [
  "Non-Disclosure Agreement",
  "Freelance Contract",
  "Rent Agreement",
  "Service Agreement",
  "Vendor Agreement",
  "Offer Letter",
  "Partnership Deed",
  "Consultant Agreement",
]

export default function EngineGrid() {
  return (
    <section id="engine" className="container mx-auto max-w-[1240px] px-8 py-32">
      {/* Header */}
      <div className="mb-20">
        <h2 className="mb-5 text-[3.2rem] font-semibold tracking-[-0.04em]">
          India-specific <span className="text-indigo-500 [text-shadow:0_0_20px_rgba(99,102,241,0.4)]">compliance.</span>
        </h2>
        <p className="max-w-[700px] text-lg font-light leading-relaxed text-slate-400">
          Generate NDAs, rent agreements, and service contracts in minutes, not
          days. Built with deep understanding of local state laws, stamp duties,
          and GST provisions.
        </p>
      </div>

      {/* Bento Matrix */}
      <div className="bento-grid">
        {/* 01 — Blazing Fast Inference */}
        <div className="bento-node span-8">
          <span className="node-idx">01 // BLAZING FAST INFERENCE</span>
          <h3>Powered by Groq &amp; Llama-3</h3>
          <p>
            Experience near-instant document generation. Kavach uses Groq&apos;s LPU
            infrastructure running{" "}
            <code className="text-indigo-400">llama-3.3-70b-versatile</code> as
            the primary engine, with seamless automatic failover to NVIDIA NIM
            for absolute reliability.
          </p>
          <div className="doc-tags">
            {DOC_TYPES.map((doc) => (
              <span key={doc} className="doc-tag">
                {doc}
              </span>
            ))}
          </div>
        </div>

        {/* 02 — Financial Automation */}
        <div className="bento-node span-4">
          <span className="node-idx">02 // FINANCIAL AUTOMATION</span>
          <h3>Stamp Duty &amp; GST</h3>
          <p>
            Stop guessing legal costs. Kavach includes a built-in state-wise
            stamp duty calculator for all 14 Indian states and automatically
            handles forward/reverse charge GST clause injection.
          </p>
        </div>

        {/* 03 — Legal Safeguards */}
        <div className="bento-node span-6">
          <span className="node-idx">03 // LEGAL SAFEGUARDS</span>
          <h3>MSME &amp; DPDP Protection</h3>
          <p>
            Draft documents that actually protect you. Automatically inject
            payment protection clauses under the MSME Development Act and data
            handling rules compliant with the DPDP Act 2023.
          </p>
        </div>

        {/* 04 — Export Formats */}
        <div className="bento-node span-6">
          <span className="node-idx">04 // EXPORT FORMATS</span>
          <h3>Professional PDF &amp; DOCX</h3>
          <p>
            Preview documents in-browser with live HTML rendering. Once
            finalized, export to professionally formatted, watermarked PDFs via
            WeasyPrint or fully editable DOCX files for client negotiation.
          </p>
        </div>
      </div>

      <style jsx>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1.5rem;
        }

        .bento-node {
          background: #0a0a12;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 3.5rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bento-node::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at top left,
            rgba(99, 102, 241, 0.08),
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }

        .bento-node:hover {
          border-color: rgba(99, 102, 241, 0.25);
          transform: translateY(-4px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
        }

        .bento-node:hover::after {
          opacity: 1;
        }

        .span-8 {
          grid-column: span 8;
        }
        .span-4 {
          grid-column: span 4;
        }
        .span-6 {
          grid-column: span 6;
        }

        .node-idx {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.75rem;
          color: #818cf8;
          margin-bottom: 2rem;
          display: block;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .bento-node h3 {
          font-size: 1.65rem;
          margin-bottom: 1rem;
          color: #ffffff;
          font-weight: 600;
          letter-spacing: -0.04em;
          line-height: 1.1;
        }

        .bento-node p {
          color: #94a3b8;
          font-size: 1.05rem;
          line-height: 1.65;
          font-weight: 300;
        }

        .doc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 2rem;
        }

        .doc-tag {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.75rem;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 6px;
          color: #94a3b8;
          transition: all 0.2s;
        }

        .doc-tag:hover {
          border-color: rgba(99, 102, 241, 0.25);
          color: #818cf8;
        }

        @media (max-width: 1024px) {
          .bento-grid {
            display: flex;
            flex-direction: column;
          }
        }

        @media (max-width: 768px) {
          .bento-node {
            padding: 2.5rem 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}
