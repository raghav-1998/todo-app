import { Request, Response } from "express";
import { sendSuccess } from "../utils/ApiResponse";

export function healthController(req:Request, res:Response){
    return sendSuccess({
        res,
        message:"TaskFlow API is healthy",
        data:{
            status:"ok"
        }
    })
}