"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/landing/Hero"
import EngineGrid from "@/components/landing/EngineGrid"
import ClauseLibraryCard from "@/components/landing/ClauseLibraryCard"
import HowItWorks from "@/components/landing/HowItWorks"
import Architecture from "@/components/landing/Architecture"
import Pricing from "@/components/landing/Pricing"
import FAQ from "@/components/landing/FAQ"
import CTABand from "@/components/landing/CTABand"
import Footer from "@/components/layout/Footer"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050508]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-500" />
          <p className="text-slate-500">Loading Kavach...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-10">
      <Navbar />
      <main>
        <Hero />
        <EngineGrid />
        <ClauseLibraryCard />
        <HowItWorks />
        <Architecture />
        <Pricing />
        <FAQ />
        <CTABand />
      </main>
      <Footer />
    </div>
  )
}
