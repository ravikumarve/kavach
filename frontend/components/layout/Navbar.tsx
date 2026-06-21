"use client"

import { useState } from "react"
import Link from "next/link"

const NAV_LINKS = [
  { href: "#engine", label: "Engine" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#architecture", label: "Architecture" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      aria-label="Main navigation"
      className="relative z-[100] mx-auto max-w-[1240px] px-8"
    >
      <div className="flex items-center justify-between border-b border-white/10 py-8">
        <Link href="/" className="flex items-center gap-3 no-underline" aria-label="Kavach home">
          <span className="logo-shield" />
          <span className="text-lg font-bold tracking-tight text-white">Kavach</span>
        </Link>

        {/* Hamburger */}
        <button
          className="flex flex-col gap-[5px] border-none bg-transparent p-2 md:hidden"
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-[2px] w-6 rounded-sm bg-white transition-all duration-300 ${
              menuOpen ? "translate-x-[5px] translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 rounded-sm bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 rounded-sm bg-white transition-all duration-300 ${
              menuOpen ? "translate-x-[5px] -translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-14 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[1px] text-slate-400 no-underline transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="https://github.com/ravikumarve/kavach"
            className="btn-outline"
          >
            GitHub
          </a>
          <Link href="/login" className="btn-primary">
            Login
          </Link>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[1px] text-slate-400 no-underline transition-colors hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
            <a
              href="https://github.com/ravikumarve/kavach"
              className="btn-outline w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              GitHub
            </a>
            <Link
              href="/login"
              className="btn-primary w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        .logo-shield {
          width: 22px;
          height: 24px;
          border: 2px solid #6366F1;
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
          background: #6366F1;
          margin-top: 4px;
          border-radius: 2px;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 2.2rem;
          font-family: 'JetBrains Mono', monospace;
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
          font-family: 'JetBrains Mono', monospace;
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
          border-color: #6366F1;
          color: #6366F1;
          background: rgba(99, 102, 241, 0.1);
        }
      `}</style>
    </nav>
  )
}
