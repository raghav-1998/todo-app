import { env } from "../config/env";
import { AuthRepository } from "../repositories/auth.repository"
import { ApiError } from "../utils/ApiError";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/password";
import { hashToken } from "../utils/tokenHash";
import jwt from "jsonwebtoken"

interface RegisterInput{
    name:string,
    email:string,
    password:string
}

interface LoginInput{
    email:string,
    password:string
}

export class AuthService{
    private readonly authRepository:AuthRepository;

    constructor() {
        this.authRepository = new AuthRepository();
    }

    async register(input:RegisterInput){
        const {name, email, password}=input;

        const existingUser=await this.authRepository.findUserByEmail(email);

        if(existingUser){
            throw new ApiError("Email is already registered", 409)
        }

        const passwordHash=await hashPassword(password)

        const user=await this.authRepository.createUser({
            name, email, password:passwordHash
        })

        return{
            user:this.sanitizeUser(user)
        }

        
    }

    async login(input:LoginInput){
        const {email, password} =input

        const user=await this.authRepository.findUserByEmail(email)
        
        if(!user){
            throw new ApiError(
                "Invalid email or password",
                401
            )
        }

        const passwordValid=comparePassword(password, user.password)

        if(!passwordValid){
            throw new ApiError(
                "Invalid email or password",
                401
            )
        }

        const accessToken=createAccessToken({
            id:user.id,email:user.email,name:user.name
        });

        const refreshToken=createRefreshToken(user.id)

        await this.storeRefreshToken(user.id, refreshToken)

        return {
            user:this.sanitizeUser(user),
            accessToken,
            refreshToken
        }
        
    
    }

    async getCurrentUser(userId:string){
        const user=await this.authRepository.findUserById(userId);

        if(!user){
            throw new ApiError("User not found", 404)
        }

        return this.sanitizeUser(user)
        
    }

    async logout(refreshToken: string | undefined){
        if(!refreshToken){
            return;
        }

        const tokenHash=hashToken(refreshToken)

        await this.authRepository.revokeRefreshToken(tokenHash);
    }

    // async refresh(refreshToken:string){
    //     const payload=jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);

    //     if(typeof(payload)!=="string" || payload)
    // }

    async refresh(refreshToken: string | undefined){
        if(!refreshToken){
            throw new ApiError("Refresh Token is required",401)
        }

        const payload=verifyRefreshToken(refreshToken);

        if(payload.type!=="refresh"){
            throw new ApiError("Invalid Refresh Token", 401)
        }

        const userId=payload.id;

        if(!userId){
            throw new ApiError("Invalid Refresh Token", 401)
        }

        const tokenHash=hashToken(refreshToken)

        const storedToken=await this.authRepository.findRefreshToken(tokenHash)

        if(!storedToken){
            throw new ApiError("Invalid Refresh Token", 401)
        }

        if (storedToken.userId !== userId) {
            throw new ApiError(
                "Invalid refresh token",
                401
            );
        }

        if(storedToken.revokedAt){
            throw new ApiError("Refresh Token has been revoked", 401)
        }

        if(storedToken.expiresAt<=new Date()){
            throw new ApiError("Refresh Token has been expired", 401)
        }


        await this.authRepository.revokeRefreshToken(tokenHash)
        const user=await this.authRepository.findUserById(userId)
        if(!user){
            throw new ApiError("Invalid User Id", 401)
        }

        const sanitizedUser=this.sanitizeUser(user)
        const accessToken=createAccessToken(sanitizedUser);
        const newRefreshToken=createRefreshToken(userId);
        this.storeRefreshToken(userId, newRefreshToken)

        return {
            user:sanitizedUser,
            accessToken,
            refreshToken:newRefreshToken
        }

    }

    private async storeRefreshToken(userId:string, refreshToken:string){
        const tokenHash=hashToken(refreshToken);

        const expiresAt=new Date(Date.now()+this.getRefreshTokenLifetime());

        await this.authRepository.createRefreshToken({
            tokenHash, userId, expiresAt
        })
    }
    private sanitizeUser(user:{
        id:string,
        name:string,
        email:string
    }){
        return{
            id:user.id,
            name:user.name,
            email:user.email
        }
    }

    private getRefreshTokenLifetime(){
        return parseInt(env.JWT_REFRESH_EXPIRES_IN)*24*60*60*1000
    }
}