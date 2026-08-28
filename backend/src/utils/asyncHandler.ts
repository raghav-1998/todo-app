import { NextFunction, Request, Response } from "express";

type AsyncController=(
    req:Request,
    res:Response,
    next:NextFunction
)=>Promise<unknown>


export function asyncHandler(
    handler:AsyncController
){
    return(
        req:Request,
        res:Response,
        next:NextFunction
    )=>{
        Promise
            .resolve(handler(req,res,next))
            .catch(next)
    }
}