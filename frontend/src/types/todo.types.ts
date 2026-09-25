export type TodoPriority=
| "LOW"
| "MEDIUM"
| "HIGH"    

export interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: TodoPriority;
  dueDate: string | null;   //Json response contains string
  userId: string;
  categoryId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoRequest{
    title:string,
    description?:string,
    priority?:TodoPriority,
    dueDate?:string,
    categoryId?:string,
}

export interface UpdateTodoRequest{
    title?:string,
    description?:string|null,
    completed?:boolean,
    priority?:TodoPriority,
    dueDate?:string|null,
    categoryId?:string|null
}

export interface TodoFilters{
    completed?:boolean,
    priority?:TodoPriority,
    categoryId?:string
}

export interface TodoResponse {
  success: boolean;
  message: string;
  data: {
    todo: Todo;
  };
}

export interface TodosResponse {
  success: boolean;
  message: string;
  data: {
    todos: Todo[];
  };
}
