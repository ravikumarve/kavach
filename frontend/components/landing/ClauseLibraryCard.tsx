const CLAUSE_TAGS = [
  "Arbitration Clause",
  "GST Reverse Charge",
  "MSME Protection",
  "DPDP Compliance",
  "Jurisdiction Selector",
  "Custom Clause Builder",
]

export default function ClauseLibraryCard() {
  return (
    <div className="container mx-auto max-w-[1240px] px-8">
      <div className="bento-node">
        <span className="node-idx">05 // CLAUSE LIBRARY</span>
        <h3>50+ India-Specific Legal Clauses</h3>
        <p>
          Access a comprehensive library of pre-drafted, India-specific legal
          clauses — from arbitration under the Arbitration and Conciliation Act
          1996 to data protection under DPDP Act 2023. Browse, search,
          customise, and inject clauses directly into any document.
        </p>
        <div className="doc-tags">
          {CLAUSE_TAGS.map((tag) => (
            <span key={tag} className="doc-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
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

        .node-idx {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.75rem;
          color: #818cf8;
          margin-bottom: 2rem;
          display: block;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        h3 {
          font-size: 1.65rem;
          margin-bottom: 1rem;
          color: #ffffff;
          font-weight: 600;
          letter-spacing: -0.04em;
          line-height: 1.1;
        }

        p {
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
      `}</style>
    </div>
  )
}
