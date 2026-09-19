import { TodoPriority } from "../generated/prisma/enums";

export interface CreateTodoInput{
    title:string,
    description?:string,
    priority?:TodoPriority,
    dueDate?:Date,
    categoryId?:string,
    userId:string
}

export interface UpdateTodoInput{
    title?:string,
    description?:string,
    completed?:boolean,
    priority?:TodoPriority,
    dueDate?:Date|null,
    categoryId?:string|null
}

export interface TodoFilters{
    completed?:boolean,
    priority?:TodoPriority,
    categoryId?:string
}