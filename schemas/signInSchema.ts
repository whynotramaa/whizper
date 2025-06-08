import {z} from 'zod'


export const signInSchema = z.object({
    password: z.string(),
    identifier: z.string()
})