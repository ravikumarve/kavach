"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

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
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Kavach</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {session.user.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">
            Create India-law-ready legal documents in minutes
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Documents Created</h3>
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="text-sm text-muted-foreground mt-2">This month</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Your Plan</h3>
            <p className="text-3xl font-bold text-secondary capitalize">
              {session.user.plan}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Current subscription</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Available Documents</h3>
            <p className="text-3xl font-bold text-accent">
              {session.user.plan === "free" ? "3" : "Unlimited"}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Per month</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 bg-secondary/10 border border-secondary/20 rounded-lg hover:bg-secondary/20 transition-colors text-left">
              <div className="text-2xl mb-2">📄</div>
              <div className="font-medium">Create Document</div>
              <div className="text-sm text-muted-foreground">Generate new legal document</div>
            </button>

            <button className="p-4 bg-secondary/10 border border-secondary/20 rounded-lg hover:bg-secondary/20 transition-colors text-left">
              <div className="text-2xl mb-2">📁</div>
              <div className="font-medium">My Documents</div>
              <div className="text-sm text-muted-foreground">View all your documents</div>
            </button>

            <button className="p-4 bg-secondary/10 border border-secondary/20 rounded-lg hover:bg-secondary/20 transition-colors text-left">
              <div className="text-2xl mb-2">📋</div>
              <div className="font-medium">Templates</div>
              <div className="text-sm text-muted-foreground">Browse document templates</div>
            </button>

            <button className="p-4 bg-secondary/10 border border-secondary/20 rounded-lg hover:bg-secondary/20 transition-colors text-left">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="font-medium">Settings</div>
              <div className="text-sm text-muted-foreground">Manage your account</div>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
