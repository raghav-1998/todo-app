import { CategoryRepository } from "../repositories/category.repository";
import { CreateCategoryInput, UpdateCategoryInput } from "../types/category.types";
import { ApiError } from "../utils/ApiError";

export class CategoryService{
    private readonly categoryRepository:CategoryRepository;

    constructor(){
        this.categoryRepository=new CategoryRepository();
    }

    async createCategory(
        userId:string,
        data:Omit<CreateCategoryInput, "userId">
    ){
        const existingCategory=await this.categoryRepository.findCategoryByName(
            userId,
            data.name
        );

        if(existingCategory){
            throw new ApiError("Category with this name already exist", 409)
        }

        return this.categoryRepository.createCategory({
            ...data,
            userId
        })
    }

    async getCategoryById(
        id:string,
        userId:string
    ){
        const category=await this.categoryRepository.findCategoryById(id,userId)
        
        if(!category){
            throw new ApiError("Category not found",404)
        }

        return category
    
    }

    async getCategories(userId:string){
        return this.categoryRepository.findCategoriesByUserId(userId)
    }

    async updateCategory(
        id:string,
        userId:string,
        data:UpdateCategoryInput
    ){
        //Check category which we have to update exist or not
        const category=await this.categoryRepository.findCategoryById(id, userId)
        
        if(!category){
            throw new ApiError("Category not found", 404)
        }

        //Neither name which send is empty nor same as present name
        if(data.name!==undefined && data.name!==category.name){
            const existingCategory=await this.categoryRepository.findCategoryByName(userId,data.name)
            
            if(existingCategory && existingCategory.id!=id){
                throw new ApiError("Category with this new name already exist", 409)
            }
        }

        return this.categoryRepository.updateCategory(id,userId,data)

    }

    async deleteCategory(
        id:string,
        userId:string
    ){
        const category=await this.categoryRepository.deleteCategory(
            id,
            userId
        )

        if(!category){
            throw new ApiError("Category not found", 404)
        }

        return category
    }
}