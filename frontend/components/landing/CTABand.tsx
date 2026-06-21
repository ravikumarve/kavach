"use client"

import Link from "next/link"

export default function CTABand() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const input = (e.target as HTMLFormElement).querySelector("input") as HTMLInputElement
    if (input?.value) {
      alert("📬 Thanks! We'll keep you posted.")
      input.value = ""
    }
  }

  return (
    <section className="container mx-auto max-w-[1240px] px-8 pb-16">
      <div className="cta-band">
        <h2>Deploy your legal shield.</h2>
        <p>
          Set up your API keys, run the Alembic migrations, and launch Kavach
          locally in minutes. Start generating India-ready legal documents
          today.
        </p>
        <div className="cta-actions">
          <a
            href="https://github.com/ravikumarve/kavach"
            className="btn-primary"
          >
            Clone Repository
          </a>
          <Link href="/register" className="btn-indigo">
            Start Free Trial
          </Link>
        </div>
        <form className="email-capture" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email for updates"
            required
            aria-label="Email address"
          />
          <button type="submit" className="btn-subscribe">
            Subscribe
          </button>
        </form>
      </div>

      <style jsx>{`
        .cta-band {
          background: linear-gradient(
            135deg,
            #11111a 0%,
            #050508 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 24px;
          padding: 6rem 4rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          margin: 4rem 0;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
        }

        .cta-band::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle at center,
            rgba(99, 102, 241, 0.08) 0%,
            transparent 60%
          );
          pointer-events: none;
        }

        .cta-band h2 {
          font-size: 3rem;
          margin-bottom: 1rem;
          position: relative;
          font-weight: 600;
          letter-spacing: -0.04em;
          line-height: 1.1;
        }

        .cta-band p {
          color: #94a3b8;
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto 3rem;
          font-weight: 300;
          line-height: 1.7;
          position: relative;
        }

        .cta-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
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

        .btn-indigo {
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
          background: #6366f1;
          color: #fff;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-indigo:hover {
          background: #818cf8;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        }

        .email-capture {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 2rem;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
        }

        .email-capture input {
          flex: 1;
          min-width: 220px;
          padding: 0.8rem 1.2rem;
          background: #0a0a12;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 6px;
          color: #ffffff;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 0.9rem;
          transition: border-color 0.3s;
        }

        .email-capture input:focus {
          border-color: #6366f1;
          outline: none;
        }

        .email-capture input::placeholder {
          color: #475569;
        }

        .btn-subscribe {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 2.2rem;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 6px;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(10, 10, 18, 0.6);
          color: #94a3b8;
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-subscribe:hover {
          border-color: #6366f1;
          color: #6366f1;
          background: rgba(99, 102, 241, 0.1);
        }

        @media (max-width: 768px) {
          .cta-band {
            padding: 4rem 2rem;
          }
          .cta-band h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  )
}
