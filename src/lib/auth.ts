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
        
        // Restrict login to Admin only
        if (credentials.email !== "admin@vendor.com") {
          return null
        }
        
        // For demo purposes, we will allow login for admin if the password matches admin123
        // or check against the database if preferred.
        if (credentials.password === "admin123") {
          return { id: "admin-id", email: "admin@vendor.com" }
        }
        
        // Fallback to check DB if they set a real password
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string }
          })
          
          if (user) {
            const isValid = await bcrypt.compare(credentials.password as string, user.password)
            if (isValid) return { id: user.id, email: user.email }
          }
        } catch (error) {
          console.error("Database connection failed")
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
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    }
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
})
