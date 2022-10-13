import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
    callbacks: {
        session({ session, token, user }) {
            session.user.role = session.user.email === process.env.GITHUB_EMAIL
                ? 'admin'
                : 'visitor'
            return session // The return type will match the one returned in `useSession()`
        },
    },
    providers: [
      GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
}

export default NextAuth(authOptions)