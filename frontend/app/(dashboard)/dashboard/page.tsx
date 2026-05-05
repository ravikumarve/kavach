"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { StatCard } from "@/components/stat-card"
import { Button } from "@/components/ui/button"
import { FileText, FolderOpen, LayoutTemplate, Settings } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

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

  const documentsUsed = session.user.documents_used || 0
  const documentsLimit = session.user.documents_limit || 3
  const availableDocuments = documentsLimit - documentsUsed

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 text-white">
              Welcome back, {session.user.name?.split(" ")[0] || "User"}!
            </h2>
            <p className="text-gray-400">
              Create India-law-ready legal documents in minutes
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Documents Created"
              value={documentsUsed}
              icon={FileText}
              description="This month"
              trend={{ value: 0, isPositive: true }}
            />
            <StatCard
              title="Your Plan"
              value={session.user.plan || "Free"}
              icon={LayoutTemplate}
              description="Current subscription"
            />
            <StatCard
              title="Available Documents"
              value={availableDocuments}
              icon={FolderOpen}
              description="Per month"
            />
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border border-purple-500/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/dashboard/create">
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 flex flex-col items-start gap-2 bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
                >
                  <FileText className="h-6 w-6 text-purple-400" />
                  <div className="text-left">
                    <div className="font-medium text-white">Create Document</div>
                    <div className="text-sm text-gray-400">
                      Generate new legal document
                    </div>
                  </div>
                </Button>
              </Link>

              <Link href="/dashboard/documents">
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 flex flex-col items-start gap-2 bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
                >
                  <FolderOpen className="h-6 w-6 text-purple-400" />
                  <div className="text-left">
                    <div className="font-medium text-white">My Documents</div>
                    <div className="text-sm text-gray-400">
                      View all your documents
                    </div>
                  </div>
                </Button>
              </Link>

              <Link href="/dashboard/templates">
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 flex flex-col items-start gap-2 bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
                >
                  <LayoutTemplate className="h-6 w-6 text-purple-400" />
                  <div className="text-left">
                    <div className="font-medium text-white">Templates</div>
                    <div className="text-sm text-gray-400">
                      Browse document templates
                    </div>
                  </div>
                </Button>
              </Link>

              <Link href="/dashboard/settings">
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 flex flex-col items-start gap-2 bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
                >
                  <Settings className="h-6 w-6 text-purple-400" />
                  <div className="text-left">
                    <div className="font-medium text-white">Settings</div>
                    <div className="text-sm text-gray-400">
                      Manage your account
                    </div>
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
