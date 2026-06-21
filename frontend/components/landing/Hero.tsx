"use client"

import Link from "next/link"

export default function Hero() {
  return (
    <section className="container mx-auto max-w-[1240px] px-8">
      <div className="grid min-h-[85vh] items-center gap-16 pt-8 md:grid-cols-[1fr_1.1fr]">
        {/* Left column */}
        <div>
          <div className="hero-badge">
            <span className="inline-block h-[6px] w-[6px] rounded-full bg-indigo-500 shadow-[0_0_10px_#6366F1]" />
            V 1.0.0 // DEVELOPMENT READY
          </div>

          <h1 className="mb-6 text-[clamp(3.5rem,5.5vw,5rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
            Your legal shield, <br />
            <span className="text-indigo-500 [text-shadow:0_0_20px_rgba(99,102,241,0.4)]">
              drafted in seconds.
            </span>
          </h1>

          <p className="mb-14 max-w-[520px] text-lg font-light leading-relaxed text-slate-400">
            Kavach democratizes access to professional legal documents. An
            AI-powered legal engine built specifically for Indian MSMEs,
            freelancers, and boutique law firms.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/register" className="btn-primary">
              Start Free
            </Link>
            <a href="#architecture" className="btn-outline">
              View Infrastructure
            </a>
          </div>
        </div>

        {/* Right column — Glass Terminal */}
        <div className="glass-terminal">
          <div className="term-header">
            <span>KAVACH_OS // INFERENCE_ENGINE</span>
            <span>
              STATUS:{" "}
              <span style={{ color: "#10B981" }}>CONNECTED</span>
            </span>
          </div>

          <div className="term-line">
            <span className="text-slate-600">[00:01]</span>
            <span>
              <span className="method" style={{ color: "#10B981" }}>
                POST
              </span>
              <span className="text-white">/api/v1/generate/</span>
            </span>
          </div>

          <div className="term-line">
            <span className="text-slate-600">[00:02]</span>
            <span className="text-white">
              Routing to primary inference:{" "}
              <span className="text-indigo-400">
                Groq (llama-3.3-70b-versatile)
              </span>
            </span>
          </div>

          <div className="term-line">
            <span className="text-slate-600">[00:03]</span>
            <span className="text-white">
              Injecting 50+ India-specific legal clauses...
            </span>
          </div>

          <div className="doc-preview">
            <strong>1. CONFIDENTIALITY PERIOD</strong>
            <br />
            The Receiving Party shall maintain the confidentiality of the
            Confidential Information for a period of{" "}
            <span className="border-b border-dashed border-indigo-500 text-white">
              2 years
            </span>{" "}
            from the date of disclosure, subject to the jurisdiction of{" "}
            <span className="border-b border-dashed border-indigo-500 text-white">
              Maharashtra
            </span>
            .
          </div>

          <div className="term-line mt-3 text-indigo-400">
            <span className="text-slate-600">&gt;</span> Document ready.
            Exporting via WeasyPrint...{" "}
            <span className="animate-blink">_</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.4rem 1.2rem;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
          color: #818cf8;
          font-size: 0.75rem;
          font-family: "JetBrains Mono", monospace;
          margin-bottom: 2.5rem;
          border-radius: 100px;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 2.2rem;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 6px;
          text-decoration: none;
          cursor: pointer;
          border: 1px solid transparent;
          background: #ffffff;
          color: #050508;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-primary:hover {
          background: transparent;
          color: #ffffff;
          border-color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
        }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 2.2rem;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 6px;
          text-decoration: none;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(10, 10, 18, 0.6);
          color: #94a3b8;
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-outline:hover {
          border-color: #6366f1;
          color: #6366f1;
          background: rgba(99, 102, 241, 0.1);
        }

        .glass-terminal {
          background: rgba(10, 10, 18, 0.6);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 2.5rem;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.8);
          transform: perspective(1000px) rotateY(-5deg);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          width: 100%;
          max-width: 550px;
          margin-left: auto;
        }

        @media (hover: hover) {
          .glass-terminal:hover {
            transform: perspective(1000px) rotateY(0deg) translateY(-10px);
            border-color: rgba(99, 102, 241, 0.25);
          }
        }

        .term-header {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.75rem;
          color: #475569;
        }

        .term-line {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.8rem;
          line-height: 2.2;
          color: #94a3b8;
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .method {
          font-weight: 600;
          width: 40px;
        }

        .doc-preview {
          margin-top: 1.5rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px dashed rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 0.85rem;
          line-height: 1.6;
          color: #94a3b8;
          position: relative;
        }

        .doc-preview::before {
          content: "PREVIEW: NDA_Acme_Corp.pdf";
          position: absolute;
          top: -10px;
          left: 15px;
          background: #0a0a12;
          padding: 0 10px;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.65rem;
          color: #6366f1;
        }

        @media (max-width: 768px) {
          .glass-terminal {
            padding: 1.5rem;
            transform: none;
          }
          .glass-terminal:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  )
}
