"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { DocumentCard } from "@/components/document-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Plus, Search, DownloadCloud } from "lucide-react"
import { DocumentType, DocumentStatus } from "@/types/document"

interface BackendDocument {
  id: string
  title: string
  doc_type: string
  status: string
  created_at: string
  updated_at: string
}

export default function DocumentsPage() {
  const { data: session, status } = useSession()
  const [documents, setDocuments] = useState<BackendDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [downloading, setDownloading] = useState<string | null>(null)

  useEffect(() => {
    if (session?.user?.accessToken) {
      fetchDocuments()
    }
  }, [session])

  const fetchDocuments = async () => {
    try {
      const response = await fetch("/api/v1/documents/", {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setDocuments(data.data.documents)
      }
    } catch (error) {
      console.error("Error fetching documents:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (id: string) => {
    setDownloading(id)
    try {
      const response = await fetch(`/api/v1/export/pdf/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => null)
        throw new Error(errData?.detail || `Download failed (${response.status})`)
      }

      // Get filename from content-disposition or use default
      const disposition = response.headers.get("content-disposition")
      let filename = "document.pdf"
      if (disposition) {
        const match = disposition.match(/filename="?(.+?)"?$/)
        if (match) filename = match[1]
      }

      // Create blob and trigger download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Download error:", error)
      alert(error instanceof Error ? error.message : "Download failed")
    } finally {
      setDownloading(null)
    }
  }

  const handleView = (id: string) => {
    window.location.href = `/documents/${id}`
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return

    try {
      const response = await fetch(`/api/v1/documents/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      })

      if (response.ok) {
        setDocuments((docs) => docs.filter((d) => d.id !== id))
      }
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  // Map backend doc_type to frontend DocumentType enum
  const mapDocType = (docType: string): string => {
    const typeMap: Record<string, string> = {
      nda: DocumentType.NDA,
      freelance_contract: DocumentType.FREELANCE_CONTRACT,
      rent_agreement: DocumentType.RENT_AGREEMENT,
      vendor_agreement: DocumentType.VENDOR_AGREEMENT,
      offer_letter: DocumentType.OFFER_LETTER,
      partnership_deed: DocumentType.PARTNERSHIP_DEED,
      service_agreement: DocumentType.SERVICE_AGREEMENT,
      consultant_agreement: DocumentType.CONSULTANT_AGREEMENT,
    }
    return typeMap[docType] || DocumentType.NDA
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.doc_type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || doc.doc_type === filterType
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-white">My Documents</h1>
              <Button
                onClick={() => (window.location.href = "/create")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Document
              </Button>
            </div>
            <p className="text-gray-400">
              Manage and view all your legal documents
            </p>
          </div>

          {/* Filters */}
          <Card className="bg-gradient-to-br from-indigo-900/10 to-indigo-900/10 border-indigo-500/20 mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-lg border border-indigo-500/20 bg-indigo-900/10 px-3 py-2 pl-10 text-sm text-gray-300 placeholder:text-gray-500 focus:border-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="rounded-lg border border-indigo-500/20 bg-indigo-900/10 px-3 py-2 text-sm text-gray-300 focus:border-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="all">All Types</option>
                    <option value="nda">NDA</option>
                    <option value="freelance_contract">Freelance Contract</option>
                    <option value="rent_agreement">Rent Agreement</option>
                    <option value="vendor_agreement">Vendor Agreement</option>
                    <option value="offer_letter">Offer Letter</option>
                    <option value="partnership_deed">Partnership Deed</option>
                    <option value="service_agreement">Service Agreement</option>
                    <option value="consultant_agreement">Consultant Agreement</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="rounded-lg border border-indigo-500/20 bg-indigo-900/10 px-3 py-2 text-sm text-gray-300 focus:border-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="generating">Generating</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading documents...</p>
            </div>
          )}

          {/* Documents Grid */}
          {!loading && filteredDocuments.length === 0 ? (
            <Card className="bg-gradient-to-br from-indigo-900/10 to-indigo-900/10 border-indigo-500/20">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-indigo-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No documents found
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {searchQuery || filterType !== "all" || filterStatus !== "all"
                      ? "Try adjusting your search or filters"
                      : "Get started by creating your first document"}
                  </p>
                  {!searchQuery &&
                    filterType === "all" &&
                    filterStatus === "all" && (
                      <Button
                        onClick={() =>
                          (window.location.href = "/create")
                        }
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create Document
                      </Button>
                    )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  id={doc.id}
                  title={doc.title}
                  type={mapDocType(doc.doc_type) as DocumentType}
                  status={doc.status as DocumentStatus}
                  createdAt={doc.created_at}
                  updatedAt={doc.updated_at}
                  onView={() => handleView(doc.id)}
                  onDownload={() => handleDownload(doc.id)}
                  onDelete={() => handleDelete(doc.id)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
