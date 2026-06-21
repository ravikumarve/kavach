import Link from "next/link"

export default function Footer() {
  return (
    <footer className="container mx-auto max-w-[1240px] px-8">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <span className="logo-shield" />
            <span className="text-lg font-bold tracking-tight text-white">Kavach</span>
          </Link>
          <p>
            Your legal shield, drafted in seconds. AI-powered legal document
            engine for Indian MSMEs, freelancers, CAs &amp; boutique law firms.
          </p>
        </div>

        {/* Platform */}
        <div className="footer-col">
          <h5>Platform</h5>
          <ul>
            <li><a href="#engine">AI Engine</a></li>
            <li><a href="#architecture">Architecture</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        {/* Development */}
        <div className="footer-col">
          <h5>Development</h5>
          <ul>
            <li><a href="https://github.com/ravikumarve/kavach">GitHub</a></li>
            <li><a href="http://localhost:8000/docs">Swagger API</a></li>
            <li><a href="https://github.com/ravikumarve/kavach/blob/main/docs/IMPLEMENTATION_PLAN.md">Roadmap</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-col">
          <h5>Company</h5>
          <ul>
            <li><a href="mailto:support@kavachlegal.com">Support</a></li>
            <li><a href="mailto:business@kavachlegal.com">Business</a></li>
            <li><a href="https://kavachlegal.com">Website</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div>© 2026 KAVACH LEGAL TECHNOLOGIES PVT. LTD. PROPRIETARY LICENSE.</div>
        <div><span className="status-dot">●</span> DEVELOPMENT READY</div>
      </div>

      <style jsx>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 4rem;
          padding: 6rem 0 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .footer-brand p {
          color: #94a3b8;
          font-size: 0.85rem;
          margin-top: 1.5rem;
          max-width: 320px;
          line-height: 1.7;
          font-weight: 300;
        }

        .footer-col h5 {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.75rem;
          color: #475569;
          margin-bottom: 1.75rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .footer-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .footer-col a {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
          font-weight: 300;
        }

        .footer-col a:hover {
          color: #ffffff;
        }

        .logo-shield {
          width: 22px;
          height: 24px;
          border: 2px solid #6366f1;
          border-radius: 4px 4px 12px 12px;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.1);
          display: flex;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
        }

        .logo-shield::after {
          content: "";
          width: 4px;
          height: 10px;
          background: #6366f1;
          margin-top: 4px;
          border-radius: 2px;
        }

        .footer-bottom {
          margin-top: 6rem;
          padding: 2rem 0 3rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          justify-content: space-between;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.75rem;
          color: #475569;
        }

        .status-dot {
          color: #10b981;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}
