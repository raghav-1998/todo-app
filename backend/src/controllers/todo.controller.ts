import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { CreateTodoInput, TodoFilters, UpdateTodoInput } from "../types/todo.types";
import { sendSuccess } from "../utils/ApiResponse";

const todoService=new TodoService();

const createTodo=asyncHandler(
    async (req:Request, res:Response)=>{
        if(!req.user){
            throw new ApiError("Authentication required", 401)
        }

        const data=req.body as Omit<CreateTodoInput, "userId">;

        const todo=await todoService.createTodo(
            req.user.id,
            data
        );

        if(!todo){
            throw new ApiError("Todo not created Successfully",500)
        }

        return sendSuccess({
            res,
            statusCode:201,
            message:"Todo created successfully",
            data:{
                todo
            }
        })
    }
);

const getTodos=asyncHandler(
    async(req:Request, res:Response)=>{
        if(!req.user){
            throw new ApiError("Authentication required", 401)
        }

        const filters=req.query as unknown as TodoFilters;

        const todos=await todoService.getTodos(req.user.id, filters)
        
        return sendSuccess({
            res,
            statusCode:200,
            message:"Todos fetched successfully",
            data:{
                todos
            }
        })
    }
)


const getTodoById=asyncHandler(
    async(req:Request, res:Response)=>{
        if(!req.user){
            throw new ApiError("Authentication required", 401)
        }

        //const{id}=req.params;
        const id=req.params.id as string

        const todo=await todoService.getTodoById(id, req.user.id);

        return sendSuccess({
            res,
            statusCode:200,
            message:"Todo fetched successfully",
            data:{
                todo
            }
        })
    }
)


const updateTodo=asyncHandler(
    async(req:Request, res:Response)=>{
        if(!req.user){
            throw new ApiError("Authentication required", 401)
        }

        const id=req.params.id as string;

        const data=req.body as UpdateTodoInput;

        const todo=await todoService.updateTodo(id, req.user.id, data)
        
        sendSuccess({
            res,
            statusCode:200,
            message:"Todo updated successfully",
            data:{
                todo
            }
        })
    }
)
const deleteTodo=asyncHandler(
    async(req:Request, res:Response)=>{
        if(!req.user){
            throw new ApiError("Authentication required", 401)
        }

        //const {id}=req.params;
        const id=req.params.id as string;

        const todo=await todoService.deleteTodo(id, req.user.id)

        return sendSuccess({
            res,
            statusCode:200,
            message:"Todo deleted successfully",
            data:{
                todo
            }
        })
    }
)
export{
    createTodo,
    getTodoById,
    getTodos,
    deleteTodo,
    updateTodo
}