import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        
        // Hardcoded admin fallback for demo purposes
        if (credentials.email === "admin@vendor.com" && credentials.password === "admin123") {
          return { id: "admin-id", email: "admin@vendor.com", name: "Admin", role: "ADMIN" }
        }
        
        // Fallback to check DB if they set a real password
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string }
          })
          
          if (user) {
            const isValid = await bcrypt.compare(credentials.password as string, user.password)
            if (isValid) {
              return { 
                id: user.id, 
                email: user.email, 
                name: user.name || "User", 
                role: user.role 
              }
            }
          }
        } catch (error) {
          console.error("Database connection failed", error)
        }

        return null
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.role = token.role as string
        session.user.name = token.name as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
        // user object is any by default, so we can access custom properties
        token.role = (user as any).role
        token.name = (user as any).name
      }
      return token
    }
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
})
