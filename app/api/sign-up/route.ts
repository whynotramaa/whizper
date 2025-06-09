import dbConnect from "@/lib/dbConnect"; // we would need this in all routes as NEXTJS runs on edge so we need to keep connecting to DB
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmails";
import { NextResponse } from "next/server";



export async function POST(request: Request) {
    await dbConnect()

    try {
        const { user, email, password } = await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne({
            user,
            isVerified: true
        })

        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "User is already verified"
            }, {
                status: 400
            })
        }

        const existingUserByMail = await UserModel.findOne({
            email
        })

        const verifyCode = Math.floor(100000 + Math.random() * 90000).toString()

        if (existingUserByMail) {
            if (existingUserByMail.isVerified) {
                return Response.json({
                    success: false,
                    message: 'User already exist with this email'
                }, {
                    status: 400
                })
            }
            else {
                const hashedPassWord = await bcrypt.hash(password, 10)
                existingUserByMail.password = hashedPassWord
                existingUserByMail.verifyCode = verifyCode
                existingUserByMail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserByMail.save()
            }

        }

        else {
            const hashedPW = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)
            const newUser = new UserModel({
                user,
                email,
                password: hashedPW,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMsg: true,
                messages: [],
            })

            await newUser.save()
        }

        // send verification email

        const emailResponse = await sendVerificationEmail(email, user, verifyCode)

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {
                status: 500
            })
        }

        return Response.json({
            success: true,
            message: "User registered successfully. Please verify your email"
        }, {
            status: 500

        })


    } catch (error) {
        console.error('Error registering user', error)
        return NextResponse.json({
            success: false,
            message: "Error Registering user"
        },
            {
                status: 201
            })
    }
}