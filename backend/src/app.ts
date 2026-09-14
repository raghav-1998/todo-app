import express from "express"
import cors from "cors"
import { env } from "./config/env";
import { pinoHttp } from "pino-http";
import { logger } from "./config/logger";
import apiRoutes from "./routes/index"
import { notFoundHandler } from "./middleware/notFound.middleware";
import { errorHandler } from "./middleware/error.middleware";
import cookieParser from "cookie-parser";

const app=express()

app.use(
    pinoHttp({
        logger,
    })
)

app.use(cors({
    // origin:env.frontendUrl,
    origin:env.FRONTEND_URL,
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())
// app.get("/api/v1/health",(req,res)=>{
//     res.status(200).json({
//         success:true,
//         message:"TaskFlow API is healthy",
//         data:{
//             status:"ok"
//         }
//     })
// })

app.use('/api/v1',apiRoutes)

app.use(notFoundHandler);

app.use(errorHandler);
export default app;