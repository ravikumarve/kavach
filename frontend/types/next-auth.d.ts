import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      accessToken: string
      plan: string
    }
  }

  interface User {
    id: string
    email: string
    name?: string | null
    accessToken: string
    plan: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    accessToken: string
    plan: string
  }
}
