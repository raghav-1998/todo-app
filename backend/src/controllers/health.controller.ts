import { Request, Response } from "express";
import { sendSuccess } from "../utils/ApiResponse";
import { checkDatabaseHealth } from "../services/health.services";

export async function healthController(req:Request, res:Response){

    const database=await checkDatabaseHealth()

    return sendSuccess({
        res,
        message:"TaskFlow API is healthy",
        data:{
            status:"ok",
            ...database
        }
    })
}