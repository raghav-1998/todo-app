import { type TodoResponse, type CreateTodoRequest, type Todo, type TodoFilters, type TodosResponse, type UpdateTodoRequest } from "../types/todo.types";
import apiClient from "./axios";

const createTodo=async(
    data:CreateTodoRequest
):Promise<Todo>=>{
    const response=await apiClient.post<TodoResponse>(
        "/todos",
        data
    );

    return response.data.data.todo
}


const getTodos=async(
    filters?:TodoFilters
):Promise<Todo[]>=>{
    const response=await apiClient.get<TodosResponse>(
        '/todos',
        {
            params:filters
        }
    );

    return response.data.data.todos
}

const getTodoById=async(
    id:string
):Promise<Todo>=>{
    const response=await apiClient.get<TodoResponse>(
        `/todos/${id}`,     
    );

    return response.data.data.todo
}

const updateTodo=async(
    id:string,
    data:UpdateTodoRequest
):Promise<Todo>=>{
    const response=await apiClient.patch<TodoResponse>(
        `/todos/${id}`,
        data
    );

    return response.data.data.todo
}

const deleteTodo=async(
    id:string
):Promise<Todo>=>{
    const response=await apiClient.delete<TodoResponse>(
        `/todos/${id}`
    );

    return response.data.data.todo
}

export{
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
}