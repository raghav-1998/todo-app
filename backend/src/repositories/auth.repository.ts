import { prisma } from "../db/prisma";

export class AuthRepository{
    async findUserByEmail(email:string){
        return prisma.user.findUnique({
            where:{
                email
            }
        })
    }

    async findUserById(id:string){
        return prisma.user.findUnique({
            where:{
                id
            }
        })
    }

    async createUser(data:{
        name:string,
        email:string,
        password:string
    }){
        return prisma.user.create({
            data,
        })
    }

    async createRefreshToken(data:{
        tokenHash:string;
        userId:string;
        expiresAt:Date;
    }){
        return prisma.refreshToken.create({
            data
        })
    }

    async findRefreshToken(tokenHash:string){
        return prisma.refreshToken.findUnique({
            where:{
                tokenHash
            },
            include:{
                user:true
            }
        })
    }

    async revokeRefreshToken(tokenHash:string){
        return prisma.refreshToken.update({
            where:{
                tokenHash,
            },
            data:{
                revokedAt:new Date()
            }
        })
    }
}