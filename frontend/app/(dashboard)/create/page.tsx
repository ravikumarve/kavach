"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Briefcase, Home, Building, User, Handshake, FileCheck, UserCheck } from "lucide-react"
import { DocumentType } from "@/types/document"

const documentTypes = [
  {
    type: DocumentType.NDA,
    title: "Non-Disclosure Agreement",
    description: "Protect your confidential information with a legally binding NDA",
    icon: FileText,
    category: "General",
  },
  {
    type: DocumentType.FREELANCE_CONTRACT,
    title: "Freelance Contract",
    description: "Define terms and conditions for freelance work arrangements",
    icon: Briefcase,
    category: "Employment",
  },
  {
    type: DocumentType.RENT_AGREEMENT,
    title: "Rent Agreement",
    description: "Create a comprehensive rental agreement for properties",
    icon: Home,
    category: "Real Estate",
  },
  {
    type: DocumentType.VENDOR_AGREEMENT,
    title: "Vendor Agreement",
    description: "Establish terms with vendors and service providers",
    icon: Building,
    category: "Business",
  },
  {
    type: DocumentType.OFFER_LETTER,
    title: "Offer Letter",
    description: "Formal job offer with all necessary terms and conditions",
    icon: User,
    category: "Employment",
  },
  {
    type: DocumentType.PARTNERSHIP_DEED,
    title: "Partnership Deed",
    description: "Define partnership terms and profit-sharing arrangements",
    icon: Handshake,
    category: "Business",
  },
  {
    type: DocumentType.SERVICE_AGREEMENT,
    title: "Service Agreement",
    description: "Outline service terms, deliverables, and payment schedules",
    icon: FileCheck,
    category: "Business",
  },
  {
    type: DocumentType.CONSULTANT_AGREEMENT,
    title: "Consultant Agreement",
    description: "Define consulting engagement terms and confidentiality",
    icon: UserCheck,
    category: "Employment",
  },
]

export default function CreateDocumentPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<DocumentType | null>(null)

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

  const handleSelectType = (type: DocumentType) => {
    setSelectedType(type)
    router.push(`/dashboard/create/${type}`)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-white">
              Create New Document
            </h1>
            <p className="text-gray-400">
              Select a document type to get started
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentTypes.map((doc) => {
              const Icon = doc.icon
              return (
                <Card
                  key={doc.type}
                  className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer group"
                  onClick={() => handleSelectType(doc.type)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                        <Icon className="h-6 w-6 text-purple-400" />
                      </div>
                      <span className="text-xs text-gray-500 bg-purple-500/10 px-2 py-1 rounded-full">
                        {doc.category}
                      </span>
                    </div>
                    <CardTitle className="text-lg text-white">
                      {doc.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {doc.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
                    >
                      Create Document
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
