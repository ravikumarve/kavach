import Link from "next/link"

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    period: "/mo",
    volume: "3 DOCUMENTS / MO",
    features: ["Basic Document Types", "PDF Export (Watermarked)", "Standard AI Generation"],
    cta: "Create Account",
    href: "/register",
    popular: false,
  },
  {
    name: "Starter",
    price: "₹749",
    period: "/mo",
    volume: "20 DOCUMENTS / MO",
    features: ["All 8 Document Types", "GST Clauses Included", "Clean PDF + DOCX Export"],
    cta: "Select Starter",
    href: "/register",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹1,499",
    period: "/mo",
    volume: "UNLIMITED DOCUMENTS",
    features: [
      "Everything in Starter",
      "Custom Clause Editor",
      "Stamp Duty Calculator",
      "Priority Inference Pipeline",
    ],
    cta: "Select Pro",
    href: "/register",
    popular: true,
  },
  {
    name: "Agency",
    price: "₹3,999",
    period: "/mo",
    volume: "FIRM & CA ACCESS",
    features: [
      "White-label Branding",
      "Client Sub-accounts",
      "Direct API Access",
      "Bulk Export Options",
    ],
    cta: "Contact Sales",
    href: "mailto:business@kavachlegal.com",
    popular: false,
  },
]

const TRUST_ITEMS = [
  { label: "Razorpay Secured", color: "#6366F1" },
  { label: "256-bit Encrypted", color: "#10B981" },
  { label: "80%+ Test Coverage", color: "#fbbf24" },
  { label: "India Data Compliance", color: "#6366F1" },
]

export default function Pricing() {
  return (
    <section id="pricing" className="container mx-auto max-w-[1240px] px-8 py-32">
      <div className="mx-auto mb-16 max-w-[600px] text-center">
        <h2 className="mb-5 text-[3.2rem] font-semibold tracking-[-0.04em]">
          Subscription <span className="text-indigo-500 [text-shadow:0_0_20px_rgba(99,102,241,0.4)]">Tiers.</span>
        </h2>
        <p className="text-lg font-light leading-relaxed text-slate-400">
          Affordable access to professional legal documents. Upgrade as your
          business scales.
        </p>
      </div>

      <div className="pricing-grid">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`price-card ${plan.popular ? "popular" : ""}`}
          >
            <div className="p-tier" style={plan.popular ? { color: "#818cf8" } : {}}>
              {plan.name}
            </div>
            <div className="p-price">
              {plan.price}
              <span>{plan.period}</span>
            </div>
            <div className="p-vol">{plan.volume}</div>
            <ul className="p-features">
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            {plan.popular ? (
              <Link href={plan.href} className="btn-indigo">
                {plan.cta}
              </Link>
            ) : (
              <Link href={plan.href} className="btn-outline">
                {plan.cta}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Trust Bar */}
      <div className="trust-bar">
        {TRUST_ITEMS.map((item) => (
          <span key={item.label} className="trust-item">
            <span
              className="trust-icon"
              style={{ background: `${item.color}25`, color: item.color }}
            >
              ✓
            </span>
            {item.label}
          </span>
        ))}
      </div>

      <style jsx>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          align-items: start;
        }

        .price-card {
          background: #0a0a12;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 2.5rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .price-card:hover {
          border-color: rgba(99, 102, 241, 0.25);
          transform: translateY(-4px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
        }

        .price-card.popular {
          border-color: rgba(99, 102, 241, 0.3);
          background: linear-gradient(
            180deg,
            rgba(99, 102, 241, 0.05) 0%,
            transparent 100%
          );
        }

        .price-card.popular::before {
          content: "MOST POPULAR";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: #6366f1;
          color: #fff;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.65rem;
          font-weight: 700;
          text-align: center;
          padding: 0.4rem;
          letter-spacing: 1px;
        }

        .p-tier {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .p-price {
          font-family: "JetBrains Mono", monospace;
          font-size: 2.2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
          letter-spacing: -1px;
        }

        .p-price span {
          font-size: 0.9rem;
          color: #94a3b8;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-weight: 400;
          letter-spacing: 0;
        }

        .p-vol {
          color: #818cf8;
          font-size: 0.75rem;
          font-family: "JetBrains Mono", monospace;
          margin-bottom: 2rem;
          font-weight: 500;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 1.5rem;
        }

        .p-features {
          list-style: none;
          margin-bottom: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .p-features li {
          color: #94a3b8;
          font-size: 0.85rem;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-weight: 300;
          line-height: 1.4;
        }

        .p-features li::before {
          content: "✓";
          color: #6366f1;
          font-family: "JetBrains Mono", monospace;
          font-weight: 700;
        }

        .btn-outline {
          display: flex;
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
          width: 100%;
        }

        .btn-outline:hover {
          border-color: #6366f1;
          color: #6366f1;
          background: rgba(99, 102, 241, 0.1);
        }

        .btn-indigo {
          display: flex;
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
          background: #6366f1;
          color: #fff;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          width: 100%;
        }

        .btn-indigo:hover {
          background: #818cf8;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        }

        .trust-bar {
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #475569;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.7rem;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .trust-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
        }

        @media (max-width: 1024px) {
          .pricing-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .pricing-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
