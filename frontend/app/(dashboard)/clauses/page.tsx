"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { FileText, Plus, Search, BookOpen, ArrowLeft, Copy, Check, X } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface ClauseEntry {
  id: string
  type: string
  title: string
  content: string
  category: string
}

export default function ClausesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [clauses, setClauses] = useState<ClauseEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedClause, setSelectedClause] = useState<ClauseEntry | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [error, setError] = useState("")

  // Custom clause modal
  const [showCustomModal, setShowCustomModal] = useState(false)
  const [customTitle, setCustomTitle] = useState("")
  const [customContent, setCustomContent] = useState("")

  // GST clause modal
  const [showGstModal, setShowGstModal] = useState(false)
  const [gstTaxable, setGstTaxable] = useState(true)
  const [gstReverseCharge, setGstReverseCharge] = useState(false)
  const [gstClause, setGstClause] = useState("")
  const [gstLoading, setGstLoading] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    async function fetchClauses() {
      try {
        const token = (session as any)?.accessToken
        const headers: Record<string, string> = {}
        if (token) headers["Authorization"] = `Bearer ${token}`

        const res = await fetch(`${API_URL}/api/v1/clauses/library`, { headers, credentials: "include" })
        const data = await res.json()

        if (data.success) {
          const raw = data.data.clauses
          // Convert object to array of entries
          const entries: ClauseEntry[] = Object.entries(raw).map(([type, content]) => ({
            id: type,
            type,
            title: type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            content: content as string,
            category: getCategory(type),
          }))
          setClauses(entries)
        } else {
          setError("Failed to load clause library")
        }
      } catch (e: any) {
        setError(e.message || "Failed to load clauses")
      } finally {
        setLoading(false)
      }
    }
    if (session) fetchClauses()
  }, [session])

  function getCategory(type: string): string {
    if (type.includes("confidential") || type.includes("non_disclosure") || type.includes("data")) return "Confidentiality & Data"
    if (type.includes("payment") || type.includes("fee") || type.includes("gst") || type.includes("tax")) return "Payment & Tax"
    if (type.includes("termination") || type.includes("renewal") || type.includes("notice")) return "Term & Termination"
    if (type.includes("liability") || type.includes("indemnity") || type.includes("warranty")) return "Liability & Indemnity"
    if (type.includes("dispute") || type.includes("arbitration") || type.includes("jurisdiction")) return "Dispute Resolution"
    if (type.includes("ip") || type.includes("intellectual") || type.includes("ownership")) return "Intellectual Property"
    return "General"
  }

  const categories = ["all", ...new Set(clauses.map((c) => c.category))]

  const filtered = clauses.filter((c) => {
    const matchSearch = search === "" || c.title.toLowerCase().includes(search.toLowerCase()) || c.content.toLowerCase().includes(search.toLowerCase())
    const matchCat = selectedCategory === "all" || c.category === selectedCategory
    return matchSearch && matchCat
  })

  const handleCopy = async (id: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch { /* fallback */ }
  }

  const handleGenerateGst = async () => {
    setGstLoading(true)
    try {
      const token = (session as any)?.accessToken
      const headers: Record<string, string> = { "Content-Type": "application/json" }
      if (token) headers["Authorization"] = `Bearer ${token}`

      const res = await fetch(
        `${API_URL}/api/v1/clauses/gst?is_taxable=${gstTaxable}&is_reverse_charge=${gstReverseCharge}`,
        { headers, credentials: "include" }
      )
      const data = await res.json()
      if (data.success) {
        setGstClause(data.data.content)
      }
    } catch (e: any) {
      setError(e.message || "Failed to generate GST clause")
    } finally {
      setGstLoading(false)
    }
  }

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a12]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="flex h-screen bg-[#0a0a12]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Clause Library</h1>
                  <p className="text-sm text-slate-400">Browse, copy, and manage legal clauses for your documents</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setShowGstModal(true); setGstClause("") }}
                  className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-xl text-sm font-medium transition-all border border-emerald-600/30"
                >
                  Generate GST Clause
                </button>
                <button
                  onClick={() => setShowCustomModal(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-600/20"
                >
                  <Plus className="w-4 h-4 inline mr-1" />
                  Custom Clause
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Search & Categories */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search clauses..."
                  className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-2.5 pl-10 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700/50"
                    }`}
                  >
                    {cat === "all" ? "All" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                <p className="text-slate-500 text-sm">Loading clause library...</p>
              </div>
            ) : (
              <>
                {/* Clause Cards */}
                {filtered.length === 0 ? (
                  <div className="text-center py-20">
                    <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-500">No clauses found</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {filtered.map((clause) => (
                      <div
                        key={clause.id}
                        className="bg-slate-900/30 border border-slate-800/50 rounded-xl p-5 hover:border-indigo-500/20 transition-all group cursor-pointer"
                        onClick={() => setSelectedClause(clause)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">{clause.category}</span>
                            <h3 className="text-sm font-semibold text-white mt-1.5">{clause.title}</h3>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleCopy(clause.id, clause.content) }}
                            className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                            title="Copy clause"
                          >
                            {copiedId === clause.id ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                          {clause.content.replace(/<[^>]*>/g, "").substring(0, 200)}...
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Clause Detail Modal */}
            {selectedClause && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedClause(null)}>
                <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="sticky top-0 bg-slate-900 border-b border-slate-700/50 p-5 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">{selectedClause.category}</span>
                      <h2 className="text-lg font-semibold text-white mt-1">{selectedClause.title}</h2>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopy(selectedClause.id, selectedClause.content)}
                        className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all"
                      >
                        {copiedId === selectedClause.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button onClick={() => setSelectedClause(null)} className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                      {selectedClause.content.replace(/<[^>]*>/g, "")}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Custom Clause Modal */}
            {showCustomModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCustomModal(false)}>
                <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                  <div className="p-5 border-b border-slate-700/50">
                    <h2 className="text-lg font-semibold text-white">Add Custom Clause</h2>
                    <p className="text-sm text-slate-400 mt-1">Write your own clause to use in documents</p>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Clause Title</label>
                      <input
                        value={customTitle}
                        onChange={(e) => setCustomTitle(e.target.value)}
                        placeholder="e.g., Non-Compete Clause"
                        className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Clause Content (Legal Text)</label>
                      <textarea
                        value={customContent}
                        onChange={(e) => setCustomContent(e.target.value)}
                        rows={6}
                        placeholder="Paste or write your legal clause text here..."
                        className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                      />
                    </div>
                  </div>
                  <div className="p-5 border-t border-slate-700/50 flex justify-end gap-3">
                    <button onClick={() => { setShowCustomModal(false); setCustomTitle(""); setCustomContent("") }} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm transition-all">
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // For now, save to localStorage for the session
                        const saved = JSON.parse(localStorage.getItem("kavach_custom_clauses") || "[]")
                        saved.push({ title: customTitle, content: customContent, id: Date.now().toString() })
                        localStorage.setItem("kavach_custom_clauses", JSON.stringify(saved))
                        setShowCustomModal(false)
                        setCustomTitle("")
                        setCustomContent("")
                      }}
                      disabled={!customTitle || !customContent}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/20"
                    >
                      Save Clause
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* GST Clause Modal */}
            {showGstModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowGstModal(false)}>
                <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                  <div className="p-5 border-b border-slate-700/50">
                    <h2 className="text-lg font-semibold text-white">Generate GST Clause</h2>
                    <p className="text-sm text-slate-400 mt-1">Generate an appropriate GST clause based on taxability</p>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Service is taxable</span>
                      <button
                        onClick={() => setGstTaxable(!gstTaxable)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${gstTaxable ? "bg-indigo-600" : "bg-slate-700"}`}
                      >
                        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${gstTaxable ? "left-6" : "left-0.5"}`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Reverse charge applicable</span>
                      <button
                        onClick={() => setGstReverseCharge(!gstReverseCharge)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${gstReverseCharge ? "bg-indigo-600" : "bg-slate-700"}`}
                      >
                        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${gstReverseCharge ? "left-6" : "left-0.5"}`} />
                      </button>
                    </div>
                    <button
                      onClick={handleGenerateGst}
                      disabled={gstLoading}
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-600/20"
                    >
                      {gstLoading ? "Generating..." : "Generate GST Clause"}
                    </button>
                    {gstClause && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Generated Clause</label>
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                          <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                            {gstClause.replace(/<[^>]*>/g, "")}
                          </pre>
                        </div>
                        <button
                          onClick={() => handleCopy("gst", gstClause)}
                          className="mt-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-all"
                        >
                          {copiedId === "gst" ? "Copied!" : "Copy to clipboard"}
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="p-5 border-t border-slate-700/50 flex justify-end">
                    <button onClick={() => { setShowGstModal(false); setGstClause("") }} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm transition-all">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
