"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Lightning Fast",
    desc: "Generate professional legal documents in under 60 seconds. No more waiting days for a lawyer.",
    gradient: "from-indigo-500/20 to-indigo-600/10",
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-400",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "India-Law Compliant",
    desc: "Every document follows Indian legal standards with state-specific clauses built in automatically.",
    gradient: "from-emerald-500/20 to-emerald-600/10",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "90% Cheaper",
    desc: "Professional legal documents starting at ₹0. Save thousands compared to traditional legal fees.",
    gradient: "from-amber-500/20 to-amber-600/10",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Bank-Grade Security",
    desc: "Your documents are encrypted end-to-end. We never share or store your sensitive data.",
    gradient: "from-rose-500/20 to-rose-600/10",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
  },
]

const docTypes = [
  { icon: "🤝", name: "NDA", desc: "Non-Disclosure Agreement" },
  { icon: "✍️", name: "Freelance Contract", desc: "Freelancer engagement terms" },
  { icon: "🏠", name: "Rent Agreement", desc: "Property rental contract" },
  { icon: "📦", name: "Vendor Agreement", desc: "Vendor/supplier terms" },
  { icon: "📋", name: "Offer Letter", desc: "Employment offer" },
  { icon: "🤝", name: "Partnership Deed", desc: "Business partnership" },
  { icon: "🔧", name: "Service Agreement", desc: "Service provider terms" },
  { icon: "👔", name: "Consultant Agreement", desc: "Consultancy contract" },
]

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    desc: "Try before you commit",
    features: ["3 documents/month", "PDF export", "Basic templates", "Email support"],
    cta: "Get Started",
    href: "/register",
    featured: false,
  },
  {
    name: "Starter",
    price: "₹749",
    period: "/month",
    desc: "For occasional use",
    features: ["20 documents/month", "PDF & DOCX export", "All templates", "Clause editor", "Email support"],
    cta: "Start Free Trial",
    href: "/register",
    featured: false,
  },
  {
    name: "Pro",
    price: "₹1,499",
    period: "/month",
    desc: "For professionals",
    features: ["Unlimited documents", "Priority AI generation", "Stamp duty calculator", "Bulk export", "Priority support"],
    cta: "Start Free Trial",
    href: "/register",
    featured: true,
  },
  {
    name: "Agency",
    price: "₹3,999",
    period: "/month",
    desc: "For firms & agencies",
    features: ["Unlimited everything", "White-label export", "Team accounts (5)", "API access", "Dedicated account manager"],
    cta: "Contact Sales",
    href: "/contact",
    featured: false,
  },
]

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a12]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-slate-500">Loading Kavach...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white">
      {/* ─── Navbar ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-[#0a0a12]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm group-hover:bg-indigo-500 transition-colors">
                K
              </div>
              <span className="text-lg font-bold tracking-tight">Kavach</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a>
              <a href="#documents" className="text-sm text-slate-400 hover:text-white transition-colors">Documents</a>
              <a href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="px-5 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all shadow-lg shadow-indigo-600/20"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-600/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-800/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            AI-Powered Legal Document Generator
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Your Legal Shield,{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-200 bg-clip-text text-transparent">
              Drafted in Seconds
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Generate India-law-ready legal documents with AI-powered automation.
            From NDAs to partnership deeds — create professional contracts in
            minutes, not days.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/register"
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 text-lg"
            >
              Create Free Account
            </Link>
            <Link
              href="#features"
              className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl transition-all border border-slate-700/50 text-lg"
            >
              See How It Works
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: "8+", label: "Document Types" },
              { value: "14+", label: "Indian States" },
              { value: "60s", label: "Avg. Generation" },
              { value: "90%", label: "Cost Savings" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-indigo-400">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why thousands choose <span className="text-indigo-400">Kavach</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Built for Indian businesses, freelancers, and legal professionals who value speed and accuracy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6 hover:border-slate-700/60 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl ${f.iconBg} ${f.iconColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Document Types ─── */}
      <section id="documents" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Documents you can create
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              From startup NDAs to rental agreements — we&apos;ve got the most common Indian legal documents covered.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {docTypes.map((d) => (
              <Link
                key={d.name}
                href="/register"
                className="group relative rounded-xl border border-slate-800/50 bg-slate-900/30 p-5 text-center hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {d.icon}
                </div>
                <div className="font-semibold text-sm mb-1">{d.name}</div>
                <div className="text-xs text-slate-500">{d.desc}</div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/register"
              className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1"
            >
              View all document types
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How it <span className="text-indigo-400">works</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Three simple steps to get your legal document ready.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Choose a Template",
                desc: "Pick from 8+ professionally crafted Indian legal document templates.",
              },
              {
                step: "02",
                title: "Fill in the Details",
                desc: "Answer a few simple questions about your specific situation.",
              },
              {
                step: "03",
                title: "Generate & Download",
                desc: "Get your document in seconds as PDF or DOCX, legally compliant and ready to use.",
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-5">
                  <span className="text-indigo-400 font-bold">{s.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, transparent <span className="text-indigo-400">pricing</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Start for free. Upgrade when you need more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl border p-6 transition-all duration-300 ${
                  p.featured
                    ? "border-indigo-500/50 bg-indigo-500/5 shadow-xl shadow-indigo-600/10 scale-105"
                    : "border-slate-800/50 bg-slate-900/30 hover:border-slate-700/50"
                }`}
              >
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-indigo-600 text-white text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="text-lg font-semibold mb-1">{p.name}</div>
                <div className="text-3xl font-bold mb-1">{p.price}<span className="text-sm text-slate-500 font-normal">{p.period}</span></div>
                <div className="text-sm text-slate-500 mb-5">{p.desc}</div>
                <ul className="space-y-2.5 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="text-sm text-slate-400 flex items-start gap-2">
                      <svg className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.href}
                  className={`block text-center w-full py-2.5 rounded-xl text-sm font-medium transition-all ${
                    p.featured
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/50"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-indigo-600/10 via-indigo-700/5 to-slate-900 border border-indigo-500/20 p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-800/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to protect your business?
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto mb-8 text-lg">
                Join thousands of Indian businesses using Kavach to generate legal documents in minutes.
                Start free — no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all shadow-xl shadow-indigo-600/25 text-lg"
                >
                  Create Free Account
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl transition-all border border-slate-700/50 text-lg"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-slate-800/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                  K
                </div>
                <span className="font-bold">Kavach</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Your AI-powered legal document engine for Indian businesses.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Templates", "API"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Refund Policy"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-white mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-slate-800/50 text-center text-sm text-slate-600">
            &copy; {new Date().getFullYear()} Kavach. All rights reserved. Made in India 🇮🇳
          </div>
        </div>
      </footer>
    </div>
  )
}
