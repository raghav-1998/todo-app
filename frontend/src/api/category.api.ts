import type { CategoriesResponse, Category, CategoryResponse, CreateCategoryRequest, UpdateCategoryRequest } from "../types/category.types";
import apiClient from "./axios";

const createCategory=async(
    data:CreateCategoryRequest
):Promise<Category>=>{
    const response=await apiClient.post<CategoryResponse>(
        "/categories",
        data
    );

    return response.data.data.category
}

const getCategories=async():Promise<Category[]>=>{
    const response=await apiClient.get<CategoriesResponse>(
        "/categories"
    );

    return response.data.data.categories
}

const getCategoryById=async(
    id:string
):Promise<Category>=>{
    const response=await apiClient.get<CategoryResponse>(
        `/categories/${id}`
    );

    return response.data.data.category
}

const updateCategory=async(
    id:string,
    data:UpdateCategoryRequest
):Promise<Category>=>{
    const response=await apiClient.patch<CategoryResponse>(
        `/categories/${id}`,
        data
    );

    return response.data.data.category
}

const deleteCategory=async(
    id:string
):Promise<Category>=>{
    const response=await apiClient.delete<CategoryResponse>(
        `/categories/${id}`
    )

    return response.data.data.category
}
export{
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}