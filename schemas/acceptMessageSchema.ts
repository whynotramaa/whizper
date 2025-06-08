import {z} from 'zod'


export const acceptMsgSchema = z.object({
    acceptmsg: z.boolean(),
})