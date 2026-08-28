import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export function notFoundHandler(req:Request, res:Response, next:NextFunction){
    next(new ApiError(
        `Route not found: ${req.method} ${req.originalUrl}`,
        404,
        "ROUTE_NOT_FOUND"
    ))
}