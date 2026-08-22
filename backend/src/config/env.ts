import "dotenv/config";

export const env={
    nodeEnv:process.env.NODE_ENV ?? "development",
    port:Number(process.env.PORT ?? 5000),
    frontendUrl:process.env.FRONTEND_URL ?? "http://localhost:5173"
} 