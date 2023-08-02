import { SessionInterface } from '@/common.types'
import { NextAuthOptions, User, getServerSession } from 'next-auth'
import GoogleProviders from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProviders({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session }) {
            console.log(session)
            return session
        },
        async signIn({ user }: { user: User }) {
            try {
                return true
            } catch (error: any) {
                console.log('Error checking if user exists: ', error.message)
                return false
            }
        },
    },
}

export async function getCurrentUser() {
    const session = (await getServerSession(authOptions)) as SessionInterface
    return session
}
