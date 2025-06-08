import {z} from 'zod'


export const messageSchema = z.object({
    content: z.string().min(10, {message: "Content must be atleast of 10 charcacters long"}).max(300, {message: "Content must not be more than 300 characters"})
})