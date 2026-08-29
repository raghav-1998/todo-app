import { prisma } from "../db/prisma";

export class TodoRepository{
    async findById(id:string){
        return prisma.todo.findUnique({
            where:{
                id,
            }
        })
    }

    async findByUserId(userId:string){
        return prisma.todo.findMany({
            where:{
                userId
            },
            orderBy:{
                createdAt:"desc"
            }
        })
    }
}