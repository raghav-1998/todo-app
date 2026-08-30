import "dotenv/config";
import {z} from "zod"
// export const env={
//     nodeEnv:process.env.NODE_ENV ?? "development",
//     port:Number(process.env.PORT ?? 5000),
//     databaseUrl:process.env.DATABASE_URL,
//     frontendUrl:process.env.FRONTEND_URL ?? "http://localhost:5173"
// } 

const envSchema=z.object({
    NODE_ENV:z
        .enum(["development", "test", "production"])
        .default("development"),
    
    PORT:z.coerce
        .number()
        .int()
        .positive()
        .default(5000),
    
    FRONTEND_URL:z
        .string()
        .url(),
    
    DATABASE_URL:z
        .string()
        .min(1),

    //Adding Acess Token and Refresh Token related validations
    JWT_ACCESS_SECRET:z.string().min(15),

    JWT_REFRESH_SECRET:z.string().min(15),

    JWT_ACCESS_EXPIRES_IN:z.string().default("15m"),

    JWT_REFRESH_EXPIRES_IN:z.string().default("7d"),

    COOKIE_SECURE:z
        .enum(["true","false"])
        .transform((val)=>val==="true")
        .default(false)
    

})


const parsedEnv=envSchema.safeParse(process.env);

if(!parsedEnv.success){
    console.error(
        "Invalid environment variables:",
        parsedEnv.error.flatten().fieldErrors
    );

    process.exit(1);
}

export const env=parsedEnv.data