import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodType } from "zod";

interface ValidationInput{
    body?: unknown; 
    query?: unknown; 
    params?: unknown 
}
export const validate=<T extends ValidationInput>(schema:ZodType<T>)=>{
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

        console.log(result);

        if(!result.success){
            return next(result.error)
        }

        //TODO Improve below 3 lines
        
        if (result.data.body !== undefined) req.body = result.data.body;
        if (result.data.query !== undefined) req.query = result.data.query as any;
        if (result.data.params !== undefined) req.params = result.data.params as any;   
        
        next()

    }
}