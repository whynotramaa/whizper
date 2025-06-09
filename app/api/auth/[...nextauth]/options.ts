import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import bcrypt from "bcryptjs"
import { NextAuthOptions } from "next-auth/react"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                Email: { label: "Email", type: "text", placeholder: "AKurmi@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect()
                try {
                    const User = await UserModel.findOne({
                        $or: [
                            { Email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    })
                    if (!User) {
                        throw new Error("No user found with this email")
                    }

                    if (!User.isVerified) {
                        throw new Error("Please verify your account first")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, User.password)
                    if (isPasswordCorrect) {
                        return User
                    }
                    else {
                        throw new Error("Incorrect Password")
                    }


                } catch (error: any) {
                    throw new Error(error)
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, User }) {
            if (User) {
                token._id = User._id?.toString()
                token.isVerified = User.isVerified
                token.isAcceptingMsg = User.isAcceptingMsg
                token.userName = User.userName
            }
            return token
        },
        async session({ token, session }) {
            if(token){
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.isAcceptingMsg = token.isAcceptingMsg
                session.user.userName = token.userName
            }
            return session
        },

    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXT_AUTH_SECRET

}