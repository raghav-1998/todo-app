import jwt, { SignOptions } from "jsonwebtoken"
import { env } from "../config/env"
import { ApiError } from "./ApiError"
interface AccessTokenPayload{
    id:string,
    email:string,
    name:string,
    type:"access"
}

interface RefreshTokenPayload{
    id:string,
    type:"refresh"
}

function createAccessToken(user:{
    id:string,
    email:string,
    name:string
}):string{
    // const options:SignOptions={
    //     expiresIn: env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"]
    // }
    const payload:AccessTokenPayload={
        id:user.id,
        email:user.email,
        name:user.name,
        type:"access"
    }
    return jwt.sign(
        // {
        //     id:user.id,
        //     email:user.email,
        //     name:user.name,
        //     type:"access"
        // },
        payload,
        env.JWT_ACCESS_SECRET,
        {
            expiresIn: env.JWT_ACCESS_EXPIRES_IN
        }
        
    )
}

function createRefreshToken(userId:string):string{
    const payload:RefreshTokenPayload={
        id:userId,
        type:"refresh"
    }
    return jwt.sign(
        payload,
        env.JWT_REFRESH_SECRET,
        {
            expiresIn:env.JWT_REFRESH_EXPIRES_IN
        }
    )
}

function verifyRefreshToken(refreshToken:string):RefreshTokenPayload{
    try {
        const payload=jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as RefreshTokenPayload;

        return payload
    } catch (error) {
        throw new ApiError("Invalid or expire Refresh Token", 401)
    }
}
export{
    createAccessToken,
    createRefreshToken,
    verifyRefreshToken
    
}