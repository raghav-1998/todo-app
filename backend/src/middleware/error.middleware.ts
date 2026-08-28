import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { ZodError } from "zod";

export function errorHandler(error:unknown, req:Request, res:Response, next:NextFunction){
    if(error instanceof ApiError){
        return res.status(error.statusCode).json({
            success:false,
            message:error.message,
            error:{
                code:error.code
            }
        })
    }

    if(error instanceof ZodError){
        return res.status(400).json({
            success:false,
            message:"Validation failed",
            error:{
                code: "VALIDATION_ERROR",
                details: error.flatten(),
            }
        })
    }



    console.error(error)

    return res.status(500).json({
        success:false,
        message:"Internal server error",
        error:{
            code:"INTERNAL_SERVER_ERROR"
        }
    })
}