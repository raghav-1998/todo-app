import {Response} from "express";
import { success } from "zod";

type SuccessResponseOptions<T>={
    res:Response;
    statusCode?:number;
    message?:string;
    data?:T;
}

export function sendSuccess<T>({res,statusCode=200,message,data}:SuccessResponseOptions<T>){
    return res.status(statusCode).json({
        success:true,
        message,
        ...(data!==undefined && {data}),
    })
}