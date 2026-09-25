export interface Category {
  id: string;
  name: string;
  color: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest{
    name:string,
    color?:string,
}

export interface UpdateCategoryRequest{
    name?:string,
    color?:string|null
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  data: {
    category: Category;
  };
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: {
    categories: Category[];
  };
}
