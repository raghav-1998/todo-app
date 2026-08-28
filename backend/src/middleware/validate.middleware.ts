import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export function validate(schema:ZodType){
    return(
        req:Request,
        res:Response,
        next:NextFunction
    )=>{
        const result=schema.safeParse({
            body:req.body,
            query:req.query,
            params:req.params
        })

        if(!result.success){
            return next(result.error)
        }

        //TODO Improve below 3 lines
        
        // req.body=result.data.body
        // req.query=result.data.query
        // req.params=result.data.params   
        
        next()

    }
}