import {z} from "zod"

const registerSchema=z.object({
    name:z
        .string()
        .trim()
        .min(2)
        .max(100),

    email:z
        .string()
        .trim()
        .email()
        .transform((email)=>email.toLowerCase()),
    
    password:z
        .string()
        .min(8)
        .max(72)
})

const loginSchema=z.object({
    email:z
        .string()
        .trim()
        .email()
        .transform((email)=>email.toLowerCase()),
    
    password:z
        .string()
        .min(1)
})

export{
    registerSchema,
    loginSchema
}