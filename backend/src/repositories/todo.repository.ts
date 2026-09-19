import { prisma } from "../db/prisma";
// import type { TodoPriority } from "../generated/prisma/enums";
import { CreateTodoInput, TodoFilters, UpdateTodoInput } from "../types/todo.types";
export class TodoRepository{
    async createTodo(data:CreateTodoInput){
        return prisma.todo.create({
            data:{
                title:data.title,
                // description:data.description,
                priority:data.priority??"MEDIUM",
                // dueDate:data.dueDate,
                userId:data.userId,
                // categoryId:data.categoryId

                ...(data.description!==undefined && {
                    description:data.description
                }),

                ...(data.dueDate!==undefined &&{
                    dueDate:data.dueDate
                }),

                ...(data.categoryId!==undefined &&{
                    categoryId:data.categoryId
                })
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

    async findTodosByUserId(userId:string, filter?:TodoFilters){
        return prisma.todo.findMany({
            where:{
                userId,

                ...(filter?.completed!==undefined &&{
                    completed:filter.completed
                }),

                ...(filter?.priority!==undefined &&{
                    priority:filter.priority
                }),

                ...(filter?.categoryId!==undefined &&{
                    categoryId:filter.categoryId
                })
            },
            orderBy:{
                createdAt:"desc"
            }
        })
    }

    async updateTodo(
        id:string,
        userId:string,
        data:UpdateTodoInput
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