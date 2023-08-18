import { SessionInterface, UserProfile } from '@/common.types'
import { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProviders from 'next-auth/providers/google'
import { JWT } from 'next-auth/jwt'
import User from '@/models/user'
import { connectToDB } from '@/utils/database'
import jsonwebtoken from 'jsonwebtoken'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProviders({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    // jwt: {
    //     encode: ({ secret, token }) => {
    //         const encodedToken = jsonwebtoken.sign(
    //             {
    //                 ...token,
    //                 iss: 'grafbase',
    //                 exp: Math.floor(Date.now() / 1000 + 60 * 60),
    //             },
    //             secret
    //         )

    //         return encodedToken
    //     },
    //     decode: ({ secret, token }) => {
    //         const decodedToken = jsonwebtoken.verify(token!, secret) as JWT
    //         return decodedToken
    //     },
    // },
    callbacks: {
        async session({ session }) {
            try {
                if (session) {
                    await connectToDB()
                    const sessionUser = await User.findOne({
                        email: session?.user?.email,
                    })
                    session.user.id = sessionUser._id.toString()
                }
                return session
            } catch (error) {
                console.log(error)
                return session
            }
        },
        async signIn({ profile }) {
            try {
                await connectToDB()

                const userExists = await User.findOne({ email: profile?.email })

                if (!userExists) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(' ', '').toLowerCase(),
                        image: profile?.picture,
                    })
                }

                return true
            } catch (error) {
                console.log(error)
                return false
            }
        },
    },
}

export async function getCurrentUser() {
    const session = (await getServerSession(authOptions)) as SessionInterface
    return session
}
