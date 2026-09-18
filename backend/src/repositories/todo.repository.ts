import { prisma } from "../db/prisma";
import type { TodoPriority } from "../generated/prisma/enums";
export class TodoRepository{
    async createTodo(data:{
        title:string;
        description:string;
        priority?:TodoPriority;
        dueDate?:Date;
        userId:string;
        categoryId?:string;
    }){
        return prisma.todo.create({
            data:{
                title:data.title,
                description:data.description,
                priority:data.priority??"MEDIUM",
                dueDate:data.dueDate,
                userId:data.userId,
                categoryId:data.categoryId
            },
        });
    }
    async findTodoById(id:string, userId:string){
        // return prisma.todo.findUnique({
        //     where:{
        //         id,
        //     }
        // })

        /*
            SELECT * FROM "Todo"
            WHERE "id" = 'provided-todo-id' 
            AND "userId" = 'provided-user-id'
            LIMIT 1;
         */
        return prisma.todo.findFirst({
            where:{
                id,
                userId
            }
        })
    }

    async findTodosByUserId(userId:string){
        return prisma.todo.findMany({
            where:{
                userId
            },
            orderBy:{
                createdAt:"desc"
            }
        })
    }

    async updateTodo(
        id:string,
        userId:string,
        data:{
            title?:string,
            description?: string | null;
            completed?: boolean;
            priority?: TodoPriority;
            dueDate?: Date | null;
            categoryId?: string | null;
        }
    ){
        const todo=await prisma.todo.findFirst({
            where:{
                id,
                userId
            },
        });

        if(!todo){
            return null
        }

        return prisma.todo.update({
            where:{
                id
            },
            data,
        })
    }

    async deleteTodo(id:string, userId:string){
        const todo=await prisma.todo.findFirst({
            where:{
                id,
                userId
            },
        });

        if(!todo){
            return null
        }

        await prisma.todo.delete({
            where:{
                id              
            }
        })

        return todo;
    }
}