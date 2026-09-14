import { Request, Response } from "express";
import { AuthService } from "../services/auth.services";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/ApiResponse";
import { refreshTokenCookieOptions } from "../config/cookie";
import { ApiError } from "../utils/ApiError";

const authService=new AuthService();

const register=asyncHandler(
    async(req: Request, res:Response)=>{
        const{name,email,password}=req.body;

        const result=await authService.register({
            name,
            email,
            password
        })

        return sendSuccess({
            res,
            statusCode:201,
            message:"User registered successfully",
            data:{
                user:result.user
            }

        })
    }
)

const login=asyncHandler(
    async (req:Request, res:Response)=>{
        const {email, password}=req.body;

        const result=await authService.login({
            email,
            password
        });

        res.cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions);

        return sendSuccess({
            res,
            statusCode:200,
            message:"Login Successfully",
            data:{
                user:result.user,
                accessToken:result.accessToken
            }
        })
    }
)

const refresh=asyncHandler(
    async(req:Request, res:Response)=>{
        const refreshToken=req.cookies?.refreshToken;

        if(!refreshToken){
            throw new ApiError("Refresh Token is Required", 401);
        }

        const result= await authService.refresh(refreshToken);

        res.cookie(
            "refreshToken",
            result.refreshToken,
            refreshTokenCookieOptions
        )

        return sendSuccess({
            res,
            statusCode:200,
            message:"Token refreshed Successfully",
            data:{
                user:result.user,
                accessToken:result.accessToken
            }
        })
    }
)

const logout=asyncHandler(
    async(req:Request, res:Response)=>{
        const refreshToken=req.cookies?.refreshToken;

        await authService.logout(refreshToken);

        res.clearCookie(
            "refreshToken",
            refreshTokenCookieOptions
        );

        return sendSuccess({
            res,
            statusCode:200,
            message:"Logout Successfully",
            data:null
        })

    }
)

const getCurrentUser=asyncHandler(
    async(req:Request, res:Response)=>{
        if(!req.user){
            throw new ApiError(
                "Authentication required",
                401
            );
        }

        const user=await authService.getCurrentUser(req.user.id)

        return sendSuccess({
            res,
            statusCode:200,
            message:"Current User Fetched",
            data:{
                user
            }
        })
    }
)
export{
    register,
    login,
    logout,
    getCurrentUser,
    refresh
}