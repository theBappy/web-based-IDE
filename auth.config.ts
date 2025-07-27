import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import type { NextAuthConfig } from 'next-auth'

const authConfig: NextAuthConfig = {
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
}

export default authConfig