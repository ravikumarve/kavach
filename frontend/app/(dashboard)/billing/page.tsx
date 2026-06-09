"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Crown, Zap, Building, Star, Loader2 } from "lucide-react"

declare global {
  interface Window {
    Razorpay: any
  }
}

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
  const { data: session, status, update } = useSession()
  const [selectedPlan, setSelectedPlan] = useState(session?.user?.plan || "free")
  const [processingPlan, setProcessingPlan] = useState<string | null>(null)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)

  // Load Razorpay checkout script
  useEffect(() => {
    if (typeof window !== "undefined" && !window.Razorpay) {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      script.onload = () => setRazorpayLoaded(true)
      document.body.appendChild(script)
    } else if (window.Razorpay) {
      setRazorpayLoaded(true)
    }
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

  if (!session) return null

  const currentPlan = plans.find((plan) => plan.id === session.user.plan) || plans[0]

  const handleUpgrade = async (planId: string) => {
    if (planId === "free" || planId === session.user.plan) return

    setProcessingPlan(planId)

    try {
      // Step 1: Create order on backend
      const orderResponse = await fetch(`/api/v1/billing/create-order?plan=${planId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      })

      if (!orderResponse.ok) {
        const err = await orderResponse.json().catch(() => null)
        throw new Error(err?.detail || "Failed to create order")
      }

      const orderData = await orderResponse.json()
      const { order_id, amount, currency, key_id, user_name, user_email } = orderData.data

      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded. Please refresh the page.")
      }

      // Step 2: Open Razorpay checkout
      const options = {
        key: key_id,
        amount: amount,
        currency: currency,
        name: "Kavach",
        description: `${planId.charAt(0).toUpperCase() + planId.slice(1)} Plan`,
        order_id: order_id,
        prefill: {
          name: user_name,
          email: user_email,
        },
        theme: {
          color: "#8B5CF6",
        },
        handler: async function (response: any) {
          // Step 3: Verify payment on backend
          try {
            const verifyResponse = await fetch("/api/v1/billing/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.user?.accessToken}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan: planId,
              }),
            })

            if (!verifyResponse.ok) {
              const err = await verifyResponse.json().catch(() => null)
              throw new Error(err?.detail || "Payment verification failed")
            }

            // Update session to reflect new plan
            await update()

            alert(`Payment successful! You are now on the ${planId} plan.`)
            setSelectedPlan(planId)
          } catch (err) {
            alert(err instanceof Error ? err.message : "Verification failed")
          }
        },
        modal: {
          ondismiss: function () {
            setProcessingPlan(null)
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on("payment.failed", function (response: any) {
        alert(`Payment failed: ${response.error.description}`)
        setProcessingPlan(null)
      })
      rzp.open()
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upgrade failed")
      setProcessingPlan(null)
    }
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
          <Card className="bg-gradient-to-br from-indigo-900/10 to-indigo-900/10 border-indigo-500/20 mb-8">
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
                    disabled={!!processingPlan}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    {processingPlan === "pro" ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...</>
                    ) : (
                      "Upgrade Plan"
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Usage */}
          <Card className="bg-gradient-to-br from-indigo-900/10 to-indigo-900/10 border-indigo-500/20 mb-8">
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
                      0 /{" "}
                      {currentPlan.id === "free"
                        ? "3"
                        : currentPlan.id === "starter"
                        ? "20"
                        : "Unlimited"}
                    </span>
                  </div>
                  <div className="w-full bg-indigo-900/20 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full transition-all"
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Plans */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-4 text-white">Available Plans</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon
              const isCurrentPlan = plan.id === session.user.plan
              const isLoading = processingPlan === plan.id
              return (
                <Card
                  key={plan.id}
                  className={`bg-gradient-to-br from-indigo-900/10 to-indigo-900/10 border-indigo-500/20 hover:border-indigo-500/40 transition-all ${
                    plan.popular ? "ring-2 ring-indigo-500" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 text-center">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-6 w-6 text-indigo-400" />
                      <CardTitle className="text-white">{plan.name}</CardTitle>
                    </div>
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-white">
                        {plan.price === 0 ? "Free" : `₹${plan.price}`}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-sm text-gray-400">/{plan.period}</span>
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
                          <Check className="h-4 w-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => handleUpgrade(plan.id)}
                      disabled={isCurrentPlan || !!processingPlan}
                      className={`w-full ${
                        isCurrentPlan
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white"
                      }`}
                    >
                      {isLoading ? (
                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...</>
                      ) : isCurrentPlan ? (
                        "Current Plan"
                      ) : (
                        "Upgrade"
                      )}
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
