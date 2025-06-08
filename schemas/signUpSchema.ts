import {z} from 'zod'

export const userNameValidation = z
.string()
.min(4, "Username must be atleast 5 character")
.max(20, "Username cannot be more than 20 characters")
.regex( /^[a-zA-Z0-9]+$/ ,"Username must not contain speacial characters")


export const signUpSchema = z.object({
    userName: userNameValidation,
    email: z.string().email({message: "invalid email address"}),
    password: z.string().min(6,{message: "Password must be atleast 6 characters"})
})