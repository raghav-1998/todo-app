import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function requireAuth(
    req:Request,
    res:Response,
    next:NextFunction
){
    const authorization=req.headers.authorization;

    if(!authorization?.startsWith("Bearer ")){
        throw new ApiError(
            "Authentication Required",
            401
        )
    }

    const token=authorization.substring(7);

    try {
        const payload=jwt.verify(
            token,
            env.JWT_ACCESS_SECRET
        );

        console.log(payload);

        if(typeof payload==="string" ||
            payload.type!=="access"
        ){
            throw new ApiError(
                "Invalid Access Token",
                401
            )
        }

        req.user={
            id: payload.id,
            email: payload.email,
            name: payload.name,
        }

        next();
    } catch (error) {
        throw new ApiError(
            "Invalid or expired access token",
            401
        );
    }

}