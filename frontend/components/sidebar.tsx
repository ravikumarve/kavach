import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  FilePlus,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  BookOpen,
  Calculator,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Create Document", href: "/create", icon: FilePlus },
  { name: "Templates", href: "/templates", icon: FileText },
  { name: "Clause Library", href: "/clauses", icon: BookOpen },
  { name: "Stamp Duty", href: "/stamp-duty", icon: Calculator },
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "flex h-full w-64 flex-col bg-gradient-to-b from-indigo-900/20 to-indigo-900/20 border-r border-indigo-500/20",
        className
      )}
    >
      <div className="flex h-16 items-center justify-center border-b border-indigo-500/20">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-400 bg-clip-text text-transparent">
          Kavach
        </h1>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-500/20 text-indigo-400"
                  : "text-gray-400 hover:bg-indigo-500/10 hover:text-gray-300"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-indigo-500/20 p-3">
        <button
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-indigo-500/10 hover:text-gray-300"
          onClick={() => {
            // Handle logout
            window.location.href = "/auth/signout"
          }}
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
