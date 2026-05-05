"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Mail, Phone, Building, Save, Key } from "lucide-react"

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    fullName: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    companyName: "",
    address: "",
  })

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

  const handleSave = async () => {
    setIsSaving(true)

    try {
      // TODO: Update user profile via API
      // const response = await fetch('/api/v1/users/profile', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // })

      // if (response.ok) {
      //   // Update session
      //   await updateSession()
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = () => {
    // TODO: Implement password change flow
    alert("Password change functionality coming soon!")
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-white">Settings</h1>
            <p className="text-gray-400">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Information */}
            <Card className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="pl-10"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className="pl-10 bg-purple-900/5"
                      placeholder="Enter your email"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Email cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="pl-10"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({ ...formData, companyName: e.target.value })
                      }
                      className="pl-10"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Enter your address"
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full bg-purple-500 hover:bg-purple-600"
                >
                  {isSaving ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <div className="space-y-6">
              {/* Change Password */}
              <Card className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Change Password</CardTitle>
                  <CardDescription className="text-gray-400">
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={handleChangePassword}
                    variant="outline"
                    className="w-full bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </CardContent>
              </Card>

              {/* Subscription Info */}
              <Card className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Subscription</CardTitle>
                  <CardDescription className="text-gray-400">
                    Your current subscription details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Plan</span>
                      <span className="text-sm text-white capitalize">
                        {session.user.plan}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">
                        Documents Used
                      </span>
                      <span className="text-sm text-white">
                        {session.user.documents_used || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">
                        Documents Limit
                      </span>
                      <span className="text-sm text-white">
                        {session.user.plan === "free"
                          ? "3"
                          : session.user.plan === "starter"
                          ? "20"
                          : "Unlimited"}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => (window.location.href = "/dashboard/billing")}
                    variant="outline"
                    className="w-full mt-4 bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
                  >
                    Manage Subscription
                  </Button>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="bg-gradient-to-br from-red-900/10 to-red-900/10 border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Danger Zone</CardTitle>
                  <CardDescription className="text-gray-400">
                    Irreversible and destructive actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full bg-red-500/10 border-red-500/20 hover:bg-red-500/20 text-red-400"
                    onClick={() => {
                      if (
                        confirm(
                          "Are you sure you want to delete your account? This action cannot be undone."
                        )
                      ) {
                        // TODO: Implement account deletion
                        alert("Account deletion functionality coming soon!")
                      }
                    }}
                  >
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
