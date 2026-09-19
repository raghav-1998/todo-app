import { CategoryRepository } from "../repositories/category.repository";
import { TodoRepository } from "../repositories/todo.repository";
import { CreateTodoInput, TodoFilters, UpdateTodoInput } from "../types/todo.types";
import { ApiError } from "../utils/ApiError";

export class TodoService{
    private readonly todoRepository:TodoRepository;
    private readonly categoryRepository:CategoryRepository;

    constructor(){
        this.todoRepository=new TodoRepository();
        this.categoryRepository=new CategoryRepository();
    }

    async createTodo(
        userId:string,
        data:Omit<CreateTodoInput,"userId">  
    ){
        if(data.categoryId){
            const categoryId=await this.categoryRepository.findCategoryById(data.categoryId,userId);

            if(!categoryId){
                throw new ApiError("Category not found",404)
            }

            return this.todoRepository.createTodo({
                ...data,
                userId
            })
        }
    }

    async getTodoById(
        id:string,
        userId:string
    ){
        const todo=await this.todoRepository.findTodoById(
            id,
            userId
        );

        if(!todo){
            throw new ApiError("Todo not found", 404)
        }

        return todo
    }

    async getTodos(
        userId:string,
        filters?:TodoFilters
    ){
        return this.todoRepository.findTodosByUserId(userId,filters)
    }


    async updateTodo(
        id:string,
        userId:string,
        data:UpdateTodoInput
    ){
        if(data.categoryId){
            const category=await this.categoryRepository.findCategoryById(
                data.categoryId,
                userId
            )

            if(!category){
                throw new ApiError("Category not found", 404)
            }
        }

        const todo=await this.todoRepository.updateTodo(id, userId,data)
        
        if(!todo){
            throw new ApiError("Todo not found", 404)
        }

        return todo
    
    }

    async deleteTodo(
        id:string,
        userId:string
    ){
        const todo=await this.todoRepository.deleteTodo(
            id,
            userId
        )

        if(!todo){
            throw new ApiError("Todo not found",404)
        }

        return todo

    }
}