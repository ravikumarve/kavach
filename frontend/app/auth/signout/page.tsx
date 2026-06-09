"use client"

import { signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function SignOutPage() {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  const handleSignOut = async () => {
    setPending(true)
    await signOut({ callbackUrl: "/" })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a12]">
      <div className="w-full max-w-md mx-4">
        <div className="bg-[#0f0f1a] border border-[#1e293b] rounded-2xl p-10 text-center shadow-2xl">
          {/* Shield icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-indigo-500/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">Leave Kavach?</h1>
          <p className="text-slate-400 mb-8">
            Are you sure you want to sign out? You&apos;ll need to log back in to access your documents.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleSignOut}
              disabled={pending}
              className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20"
            >
              {pending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing out...
                </span>
              ) : (
                "Yes, sign out"
              )}
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="w-full px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition-all duration-200 border border-slate-700/50"
            >
              Cancel — stay logged in
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-slate-600 text-sm">
          Kavach &mdash; Your Legal Shield
        </p>
      </div>
    </div>
  )
}
