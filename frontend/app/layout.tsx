import type { Metadata, Viewport } from "next"
import "../styles/globals.css"
import { Providers } from "@/components/providers"
import ShieldCanvas from "@/components/ambient/ShieldCanvas"
import BlueprintGrid from "@/components/ambient/BlueprintGrid"

export const metadata: Metadata = {
  title: "Kavach — AI Legal Document Engine for India",
  description:
    "Generate India-law-ready legal documents in minutes with AI-powered automation. NDAs, rent agreements, service contracts for MSMEs, freelancers, CAs & law firms.",
  openGraph: {
    title: "Kavach — AI Legal Document Engine for India",
    description:
      "Your legal shield, drafted in seconds. AI-powered legal documents for Indian businesses.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#050508",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect x='8' y='4' width='16' height='20' rx='4' fill='none' stroke='%236366F1' stroke-width='2'/><path d='M14 12l2 3 3-4' fill='none' stroke='%236366F1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>" />
      </head>
      <body className="min-h-screen bg-[#050508] text-white antialiased overflow-x-hidden">
        <ShieldCanvas />
        <BlueprintGrid />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
