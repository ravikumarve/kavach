"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { DocumentCard } from "@/components/document-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Plus, Search, Filter } from "lucide-react"
import { DocumentType, DocumentStatus } from "@/types/document"

// Mock data for demonstration
const mockDocuments = [
  {
    id: "1",
    title: "NDA - TechCorp Solutions",
    type: DocumentType.NDA,
    status: DocumentStatus.COMPLETED,
    createdAt: "2026-05-01T10:00:00Z",
    updatedAt: "2026-05-01T10:30:00Z",
  },
  {
    id: "2",
    title: "Freelance Contract - John Doe",
    type: DocumentType.FREELANCE_CONTRACT,
    status: DocumentStatus.COMPLETED,
    createdAt: "2026-05-02T14:00:00Z",
    updatedAt: "2026-05-02T14:30:00Z",
  },
  {
    id: "3",
    title: "Rent Agreement - 123 Main Street",
    type: DocumentType.RENT_AGREEMENT,
    status: DocumentStatus.DRAFT,
    createdAt: "2026-05-03T09:00:00Z",
    updatedAt: "2026-05-03T09:15:00Z",
  },
]

export default function DocumentsPage() {
  const { data: session, status } = useSession()
  const [documents, setDocuments] = useState(mockDocuments)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  useEffect(() => {
    // TODO: Fetch documents from API
    // const fetchDocuments = async () => {
    //   try {
    //     const response = await fetch('/api/v1/documents/')
    //     if (response.ok) {
    //       const data = await response.json()
    //       setDocuments(data.data.documents)
    //     }
    //   } catch (error) {
    //     console.error('Error fetching documents:', error)
    //   }
    // }
    // fetchDocuments()
  }, [])

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

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || doc.type === filterType
    const matchesStatus =
      filterStatus === "all" || doc.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const handleView = (id: string) => {
    // TODO: Navigate to document detail page
    console.log("View document:", id)
  }

  const handleDownload = (id: string) => {
    // TODO: Download document
    console.log("Download document:", id)
  }

  const handleDelete = (id: string) => {
    // TODO: Delete document
    console.log("Delete document:", id)
  }

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
                onClick={() => (window.location.href = "/dashboard/create")}
                className="bg-purple-500 hover:bg-purple-600"
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
          <Card className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20 mb-6">
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
                      className="w-full rounded-lg border border-purple-500/20 bg-purple-900/10 px-3 py-2 pl-10 text-sm text-gray-300 placeholder:text-gray-500 focus:border-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="rounded-lg border border-purple-500/20 bg-purple-900/10 px-3 py-2 text-sm text-gray-300 focus:border-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  >
                    <option value="all">All Types</option>
                    <option value={DocumentType.NDA}>NDA</option>
                    <option value={DocumentType.FREELANCE_CONTRACT}>
                      Freelance Contract
                    </option>
                    <option value={DocumentType.RENT_AGREEMENT}>
                      Rent Agreement
                    </option>
                    <option value={DocumentType.VENDOR_AGREEMENT}>
                      Vendor Agreement
                    </option>
                    <option value={DocumentType.OFFER_LETTER}>
                      Offer Letter
                    </option>
                    <option value={DocumentType.PARTNERSHIP_DEED}>
                      Partnership Deed
                    </option>
                    <option value={DocumentType.SERVICE_AGREEMENT}>
                      Service Agreement
                    </option>
                    <option value={DocumentType.CONSULTANT_AGREEMENT}>
                      Consultant Agreement
                    </option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="rounded-lg border border-purple-500/20 bg-purple-900/10 px-3 py-2 text-sm text-gray-300 focus:border-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  >
                    <option value="all">All Status</option>
                    <option value={DocumentStatus.DRAFT}>Draft</option>
                    <option value={DocumentStatus.GENERATING}>
                      Generating
                    </option>
                    <option value={DocumentStatus.COMPLETED}>
                      Completed
                    </option>
                    <option value={DocumentStatus.FAILED}>Failed</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents Grid */}
          {filteredDocuments.length === 0 ? (
            <Card className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-purple-400 mx-auto mb-4" />
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
                        onClick={() => (window.location.href = "/dashboard/create")}
                        className="bg-purple-500 hover:bg-purple-600"
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
                  type={doc.type}
                  status={doc.status}
                  createdAt={doc.createdAt}
                  updatedAt={doc.updatedAt}
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
