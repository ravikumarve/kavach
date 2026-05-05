"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Briefcase, Home, Building, User, Handshake, FileCheck, UserCheck, Search } from "lucide-react"
import { DocumentType } from "@/types/document"

const templates = [
  {
    type: DocumentType.NDA,
    title: "Non-Disclosure Agreement",
    description: "Protect your confidential information with a legally binding NDA",
    icon: FileText,
    category: "General",
    isPremium: false,
  },
  {
    type: DocumentType.FREELANCE_CONTRACT,
    title: "Freelance Contract",
    description: "Define terms and conditions for freelance work arrangements",
    icon: Briefcase,
    category: "Employment",
    isPremium: false,
  },
  {
    type: DocumentType.RENT_AGREEMENT,
    title: "Rent Agreement",
    description: "Create a comprehensive rental agreement for properties",
    icon: Home,
    category: "Real Estate",
    isPremium: false,
  },
  {
    type: DocumentType.VENDOR_AGREEMENT,
    title: "Vendor Agreement",
    description: "Establish terms with vendors and service providers",
    icon: Building,
    category: "Business",
    isPremium: true,
  },
  {
    type: DocumentType.OFFER_LETTER,
    title: "Offer Letter",
    description: "Formal job offer with all necessary terms and conditions",
    icon: User,
    category: "Employment",
    isPremium: false,
  },
  {
    type: DocumentType.PARTNERSHIP_DEED,
    title: "Partnership Deed",
    description: "Define partnership terms and profit-sharing arrangements",
    icon: Handshake,
    category: "Business",
    isPremium: true,
  },
  {
    type: DocumentType.SERVICE_AGREEMENT,
    title: "Service Agreement",
    description: "Outline service terms, deliverables, and payment schedules",
    icon: FileCheck,
    category: "Business",
    isPremium: true,
  },
  {
    type: DocumentType.CONSULTANT_AGREEMENT,
    title: "Consultant Agreement",
    description: "Define consulting engagement terms and confidentiality",
    icon: UserCheck,
    category: "Employment",
    isPremium: true,
  },
]

const categories = ["All", "General", "Employment", "Real Estate", "Business"]

export default function TemplatesPage() {
  const { data: session, status } = useSession()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

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

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "All" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleUseTemplate = (type: DocumentType) => {
    window.location.href = `/dashboard/create/${type}`
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-white">
              Document Templates
            </h1>
            <p className="text-gray-400">
              Browse and use our professionally crafted legal document templates
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20 mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search templates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-lg border border-purple-500/20 bg-purple-900/10 px-3 py-2 pl-10 text-sm text-gray-300 placeholder:text-gray-500 focus:border-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category
                          ? "bg-purple-500 hover:bg-purple-600"
                          : "bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => {
              const Icon = template.icon
              return (
                <Card
                  key={template.type}
                  className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20 hover:border-purple-500/40 transition-all"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="p-3 bg-purple-500/20 rounded-lg">
                        <Icon className="h-6 w-6 text-purple-400" />
                      </div>
                      {template.isPremium && (
                        <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full border border-purple-500/20">
                          Premium
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-lg text-white">
                      {template.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-gray-500">
                        {template.category}
                      </span>
                      {template.isPremium && (
                        <span className="text-xs text-purple-400">
                          Requires Pro plan
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={() => handleUseTemplate(template.type)}
                      className="w-full bg-purple-500 hover:bg-purple-600"
                    >
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <Card className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No templates found
                  </h3>
                  <p className="text-gray-400">
                    Try adjusting your search or category filter
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
