"use client"

import { useSession } from "next-auth/react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MessageCircle, BookOpen, Video, ExternalLink } from "lucide-react"

const helpCategories = [
  {
    title: "Getting Started",
    icon: BookOpen,
    items: [
      {
        title: "How to create your first document",
        description: "Learn the basics of document generation",
      },
      {
        title: "Understanding document types",
        description: "Overview of all available document templates",
      },
      {
        title: "Account setup and configuration",
        description: "Set up your profile and preferences",
      },
    ],
  },
  {
    title: "Document Generation",
    icon: MessageCircle,
    items: [
      {
        title: "How to fill document forms",
        description: "Step-by-step guide to completing forms",
      },
      {
        title: "Customizing document clauses",
        description: "Add and modify legal clauses",
      },
      {
        title: "Exporting documents",
        description: "Download PDF and DOCX formats",
      },
    ],
  },
  {
    title: "Billing & Plans",
    icon: Video,
    items: [
      {
        title: "Understanding pricing plans",
        description: "Compare features and pricing",
      },
      {
        title: "Upgrading your subscription",
        description: "How to upgrade to a higher plan",
      },
      {
        title: "Managing payments",
        description: "View invoices and payment history",
      },
    ],
  },
  {
    title: "Support",
    icon: Mail,
    items: [
      {
        title: "Contact support",
        description: "Get help from our support team",
      },
      {
        title: "Report a bug",
        description: "Report issues and bugs",
      },
      {
        title: "Feature requests",
        description: "Suggest new features",
      },
    ],
  },
]

export default function HelpPage() {
  const { data: session, status } = useSession()

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

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-white">Help Center</h1>
            <p className="text-gray-400">
              Find answers to your questions and get support
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer">
              <CardHeader>
                <div className="p-3 bg-purple-500/20 rounded-lg w-fit mb-2">
                  <BookOpen className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-white">Documentation</CardTitle>
                <CardDescription className="text-gray-400">
                  Browse our comprehensive documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
                >
                  View Docs
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer">
              <CardHeader>
                <div className="p-3 bg-purple-500/20 rounded-lg w-fit mb-2">
                  <Video className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-white">Video Tutorials</CardTitle>
                <CardDescription className="text-gray-400">
                  Watch step-by-step video guides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
                >
                  Watch Videos
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer">
              <CardHeader>
                <div className="p-3 bg-purple-500/20 rounded-lg w-fit mb-2">
                  <Mail className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-white">Contact Support</CardTitle>
                <CardDescription className="text-gray-400">
                  Get help from our support team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
                >
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Help Categories */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Browse by Category
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {helpCategories.map((category) => {
              const Icon = category.icon
              return (
                <Card
                  key={category.title}
                  className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Icon className="h-5 w-5 text-purple-400" />
                      </div>
                      <CardTitle className="text-white">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.items.map((item, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            className="block p-3 rounded-lg bg-purple-500/5 hover:bg-purple-500/10 transition-colors"
                          >
                            <h4 className="text-sm font-medium text-white mb-1">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-400">
                              {item.description}
                            </p>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* FAQ Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Frequently Asked Questions
            </h2>
            <Card className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-purple-500/5">
                    <h4 className="text-sm font-medium text-white mb-2">
                      How do I create a new document?
                    </h4>
                    <p className="text-xs text-gray-400">
                      Navigate to the "Create Document" page, select a document
                      type, fill in the required information, and click
                      "Generate Document". Your document will be created
                      automatically.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-500/5">
                    <h4 className="text-sm font-medium text-white mb-2">
                      What document types are available?
                    </h4>
                    <p className="text-xs text-gray-400">
                      We offer 8 document types: NDA, Freelance Contract, Rent
                      Agreement, Vendor Agreement, Offer Letter, Partnership
                      Deed, Service Agreement, and Consultant Agreement.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-500/5">
                    <h4 className="text-sm font-medium text-white mb-2">
                      How do I upgrade my plan?
                    </h4>
                    <p className="text-xs text-gray-400">
                      Go to the "Billing" page, select the plan you want to
                      upgrade to, and complete the payment process. Your plan
                      will be upgraded immediately.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-500/5">
                    <h4 className="text-sm font-medium text-white mb-2">
                      Can I download documents in different formats?
                    </h4>
                    <p className="text-xs text-gray-400">
                      Yes! You can download documents in both PDF and DOCX
                      formats. PDF is available on all plans, while DOCX is
                      available on Starter and higher plans.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Support */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Still need help?
            </h2>
            <Card className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email Support
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Live Chat
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Community Forum
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
