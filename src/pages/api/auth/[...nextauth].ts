import NextAuth, { Account, Profile } from "next-auth"
import Google, { GoogleProfile } from "next-auth/providers/google"

const whitelistedEmails = process.env.WHITELISTED_EMAILS?.split(',') || []

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!, // TODO: Add client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // TODO: Add client secret
    }),
  ],
  callbacks: {
    // Only allow certain emails
    async signIn({ account, profile }: { account: Account | null; profile?: Profile }) {
      const { provider } = account || {}
      if (provider === "google") {
        const googleProfile = profile as GoogleProfile
        const { email_verified, email } = googleProfile
        if (email_verified && whitelistedEmails.includes(email)) {
          return true
        }
      }
      return false
    },
  },
}
export default NextAuth(authOptions)
