import type { CookieOptions } from "express";
import { env } from "./env";

export const refreshTokenCookieOptions:CookieOptions={
    httpOnly:true,
    secure:env.COOKIE_SECURE,
    sameSite:env.NODE_ENV==="production"
        ? "none"
        :"lax",
    
    path:"/api/v1/auth",
    maxAge:7*24*60*60*1000
}