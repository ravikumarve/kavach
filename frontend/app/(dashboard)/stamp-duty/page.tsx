"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { Calculator, ArrowRight, IndianRupee, MapPin, FileText, BarChart3 } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface StateOption {
  code: string
  name: string
}

interface DocTypeOption {
  code: string
  name: string
}

interface CalcResult {
  state: string
  document_type: string
  document_value: number
  stamp_duty_rate: number
  stamp_duty_amount: number
  total_amount: number
  is_taxable: boolean
  currency: string
}

interface ComparisonRow {
  state: string
  rate: number
  stamp_duty_amount: number
  total_amount: number
  is_taxable: boolean
}

export default function StampDutyPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [states, setStates] = useState<StateOption[]>([])
  const [docTypes, setDocTypes] = useState<DocTypeOption[]>([])
  const [selectedState, setSelectedState] = useState("")
  const [selectedDocType, setSelectedDocType] = useState("")
  const [documentValue, setDocumentValue] = useState("")
  const [result, setResult] = useState<CalcResult | null>(null)
  const [comparisons, setComparisons] = useState<ComparisonRow[]>([])
  const [loading, setLoading] = useState(false)
  const [compareLoading, setCompareLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState<"calculate" | "compare">("calculate")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  // Fetch states and doc types on mount
  useEffect(() => {
    async function fetchMeta() {
      try {
        const token = (session as any)?.accessToken
        const headers: Record<string, string> = {}
        if (token) headers["Authorization"] = `Bearer ${token}`

        const [statesRes, docTypesRes] = await Promise.all([
          fetch(`${API_URL}/api/v1/stamp-duty/states`, { headers, credentials: "include" }),
          fetch(`${API_URL}/api/v1/stamp-duty/document-types`, { headers, credentials: "include" }),
        ])
        const statesData = await statesRes.json()
        const docTypesData = await docTypesRes.json()

        if (statesData.success) setStates(statesData.data.states)
        if (docTypesData.success) setDocTypes(docTypesData.data.document_types)
      } catch (e) {
        console.error("Failed to fetch metadata", e)
      }
    }
    if (session) fetchMeta()
  }, [session])

  const handleCalculate = async () => {
    if (!selectedState || !selectedDocType || !documentValue) {
      setError("Please fill in all fields")
      return
    }
    setLoading(true)
    setError("")
    setResult(null)

    try {
      const token = (session as any)?.accessToken
      const headers: Record<string, string> = { "Content-Type": "application/json" }
      if (token) headers["Authorization"] = `Bearer ${token}`

      const res = await fetch(
        `${API_URL}/api/v1/stamp-duty/calculate?state=${selectedState}&doc_type=${selectedDocType}&document_value=${parseFloat(documentValue)}`,
        { headers, credentials: "include" }
      )
      const data = await res.json()
      if (data.success) {
        setResult(data.data)
      } else {
        setError(data.detail || "Calculation failed")
      }
    } catch (e: any) {
      setError(e.message || "Failed to calculate")
    } finally {
      setLoading(false)
    }
  }

  const handleCompare = async () => {
    if (!selectedDocType || !documentValue) {
      setError("Please select a document type and enter a value")
      return
    }
    setCompareLoading(true)
    setError("")

    try {
      const token = (session as any)?.accessToken
      const headers: Record<string, string> = { "Content-Type": "application/json" }
      if (token) headers["Authorization"] = `Bearer ${token}`

      const res = await fetch(
        `${API_URL}/api/v1/stamp-duty/compare?doc_type=${selectedDocType}&document_value=${parseFloat(documentValue)}`,
        { headers, credentials: "include" }
      )
      const data = await res.json()
      if (data.success) {
        setComparisons(data.data.comparisons)
      } else {
        setError(data.detail || "Comparison failed")
      }
    } catch (e: any) {
      setError(e.message || "Failed to compare")
    } finally {
      setCompareLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount)
  }

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
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Stamp Duty Calculator</h1>
                <p className="text-sm text-slate-400">Calculate stamp duty and registration fees across Indian states</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 bg-slate-900/50 rounded-xl p-1 w-fit border border-slate-800/50">
              <button
                onClick={() => setActiveTab("calculate")}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "calculate"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <IndianRupee className="w-4 h-4 inline mr-1.5" />
                Calculate
              </button>
              <button
                onClick={() => setActiveTab("compare")}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "compare"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-1.5" />
                Compare States
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Input Form */}
            <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6 mb-8">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                {/* State selector */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    State
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-2.5 text-sm text-white focus:border-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="">Select state</option>
                    {states.map((s) => (
                      <option key={s.code} value={s.code}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* Document type selector */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <FileText className="w-4 h-4 inline mr-1" />
                    Document Type
                  </label>
                  <select
                    value={selectedDocType}
                    onChange={(e) => setSelectedDocType(e.target.value)}
                    className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-2.5 text-sm text-white focus:border-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="">Select type</option>
                    {docTypes.map((d) => (
                      <option key={d.code} value={d.code}>{d.name}</option>
                    ))}
                  </select>
                </div>

                {/* Value input */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <IndianRupee className="w-4 h-4 inline mr-1" />
                    Document Value (₹)
                  </label>
                  <input
                    type="number"
                    value={documentValue}
                    onChange={(e) => setDocumentValue(e.target.value)}
                    placeholder="e.g. 500000"
                    className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCalculate}
                  disabled={loading || !selectedState}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-600/20"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Calculating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Calculator className="w-4 h-4" />
                      Calculate
                    </span>
                  )}
                </button>
                <button
                  onClick={handleCompare}
                  disabled={compareLoading}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-medium transition-all border border-slate-700/50"
                >
                  {compareLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Comparing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Compare All States
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Result Card */}
            {result && (
              <div className="bg-gradient-to-br from-indigo-600/10 via-indigo-700/5 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 mb-8">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-indigo-400" />
                  Calculation Result
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">State</span>
                      <span className="text-white font-medium">{result.state}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Document Type</span>
                      <span className="text-white font-medium">{result.document_type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Document Value</span>
                      <span className="text-white font-medium">{formatCurrency(result.document_value)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Stamp Duty Rate</span>
                      <span className="text-white font-medium">{result.stamp_duty_rate}%</span>
                    </div>
                  </div>
                  <div className="space-y-3 border-t md:border-t-0 md:border-l border-slate-700/50 md:pl-6 pt-3 md:pt-0">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Stamp Duty Amount</span>
                      <span className="text-indigo-400 font-semibold text-lg">{formatCurrency(result.stamp_duty_amount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Registration Fee (estimated)</span>
                      <span className="text-white font-medium">{formatCurrency(100)}</span>
                    </div>
                    <div className="border-t border-slate-700/50 pt-3 flex justify-between text-sm">
                      <span className="text-slate-200 font-semibold">Total Amount</span>
                      <span className="text-emerald-400 font-bold text-xl">{formatCurrency(result.total_amount + 100)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Comparison Table */}
            {comparisons.length > 0 && (
              <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                  State Comparison — {comparisons[0]?.stamp_duty_amount ? formatCurrency(comparisons[0].stamp_duty_amount) : "—"} lowest
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700/50">
                        <th className="text-left py-3 px-2 text-slate-400 font-medium">State</th>
                        <th className="text-right py-3 px-2 text-slate-400 font-medium">Rate (%)</th>
                        <th className="text-right py-3 px-2 text-slate-400 font-medium">Stamp Duty</th>
                        <th className="text-right py-3 px-2 text-slate-400 font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisons.map((c, i) => (
                        <tr key={c.state} className={`border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors ${i === 0 ? "bg-emerald-500/5" : ""}`}>
                          <td className="py-3 px-2 text-white flex items-center gap-2">
                            {i === 0 && (
                              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Lowest</span>
                            )}
                            {c.state}
                          </td>
                          <td className="text-right py-3 px-2 text-slate-300">{c.rate}%</td>
                          <td className={`text-right py-3 px-2 font-medium ${i === 0 ? "text-emerald-400" : "text-white"}`}>
                            {formatCurrency(c.stamp_duty_amount)}
                          </td>
                          <td className="text-right py-3 px-2 text-white font-medium">
                            {formatCurrency(c.total_amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
