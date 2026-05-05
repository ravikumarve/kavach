"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Crown, Zap, Building, Star } from "lucide-react"

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "3 documents per month",
      "Basic document types",
      "PDF export only",
      "Email support",
    ],
    icon: Star,
    popular: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: 749,
    period: "month",
    description: "For individuals and small teams",
    features: [
      "20 documents per month",
      "All document types",
      "PDF + DOCX export",
      "GST clauses included",
      "Priority email support",
    ],
    icon: Zap,
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 1499,
    period: "month",
    description: "For growing businesses",
    features: [
      "Unlimited documents",
      "All document types",
      "PDF + DOCX export",
      "GST clauses included",
      "Clause editor",
      "Stamp duty calculator",
      "Priority support",
    ],
    icon: Crown,
    popular: false,
  },
  {
    id: "agency",
    name: "Agency",
    price: 3999,
    period: "month",
    description: "For agencies and enterprises",
    features: [
      "Unlimited documents",
      "All document types",
      "PDF + DOCX export",
      "GST clauses included",
      "Clause editor",
      "Stamp duty calculator",
      "White-label option",
      "Client accounts",
      "API access",
      "Dedicated support",
    ],
    icon: Building,
    popular: false,
  },
]

export default function BillingPage() {
  const { data: session, status } = useSession()
  const [selectedPlan, setSelectedPlan] = useState(session?.user?.plan || "free")

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

  const currentPlan = plans.find((plan) => plan.id === session.user.plan) || plans[0]

  const handleUpgrade = (planId: string) => {
    // TODO: Implement upgrade flow with Razorpay
    console.log("Upgrade to plan:", planId)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-white">Billing & Plans</h1>
            <p className="text-gray-400">
              Manage your subscription and billing information
            </p>
          </div>

          {/* Current Plan */}
          <Card className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Current Plan</CardTitle>
              <CardDescription className="text-gray-400">
                You are currently on the {currentPlan.name} plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {currentPlan.price === 0 ? "Free" : `₹${currentPlan.price}`}
                    {currentPlan.price > 0 && (
                      <span className="text-lg font-normal text-gray-400">
                        /{currentPlan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400">{currentPlan.description}</p>
                </div>
                {currentPlan.id !== "agency" && (
                  <Button
                    onClick={() => handleUpgrade("pro")}
                    className="bg-purple-500 hover:bg-purple-600"
                  >
                    Upgrade Plan
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Usage */}
          <Card className="bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Usage This Month</CardTitle>
              <CardDescription className="text-gray-400">
                Track your document usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">Documents Used</span>
                    <span className="text-sm text-white">
                      {session.user.documents_used || 0} /{" "}
                      {currentPlan.id === "free"
                        ? "3"
                        : currentPlan.id === "starter"
                        ? "20"
                        : "Unlimited"}
                    </span>
                  </div>
                  <div className="w-full bg-purple-900/20 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${
                          currentPlan.id === "free"
                            ? ((session.user.documents_used || 0) / 3) * 100
                            : currentPlan.id === "starter"
                            ? ((session.user.documents_used || 0) / 20) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Plans */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Available Plans
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon
              const isCurrentPlan = plan.id === session.user.plan
              return (
                <Card
                  key={plan.id}
                  className={`bg-gradient-to-br from-purple-900/10 to-magenta-900/10 border-purple-500/20 hover:border-purple-500/40 transition-all ${
                    plan.popular ? "ring-2 ring-purple-500" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-purple-500 text-white text-xs font-semibold px-3 py-1 text-center">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-6 w-6 text-purple-400" />
                      <CardTitle className="text-white">{plan.name}</CardTitle>
                    </div>
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-white">
                        {plan.price === 0 ? "Free" : `₹${plan.price}`}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-sm text-gray-400">
                          /{plan.period}
                        </span>
                      )}
                    </div>
                    <CardDescription className="text-gray-400">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => handleUpgrade(plan.id)}
                      disabled={isCurrentPlan}
                      className={`w-full ${
                        isCurrentPlan
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-purple-500 hover:bg-purple-600"
                      }`}
                    >
                      {isCurrentPlan ? "Current Plan" : "Upgrade"}
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
