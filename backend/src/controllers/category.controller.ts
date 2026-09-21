import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { CreateCategoryInput, UpdateCategoryInput } from "../types/category.types";
import { sendSuccess } from "../utils/ApiResponse";

const categoryService=new CategoryService();

const createCategory=asyncHandler(
    async(req:Request, res:Response)=>{
        if(!req.user){
            throw new ApiError("Authentication Required", 401)
        }

        const data=req.body as Omit<CreateCategoryInput, "userId">
        
        const category=await categoryService.createCategory(
            req.user.id,
            data
        );

        sendSuccess({
            res,
            statusCode:201,
            message:"Category Created Successfully",
            data:{
                category
            }
        })
    }
);

const getCategories=asyncHandler(
    async(req:Request, res:Response)=>{
        if(!req.user){
            throw new ApiError(
                "Authentication Required",
                401
            )
        }

        const categories=await categoryService.getCategories(req.user.id);

        return sendSuccess({
            res,
            statusCode:200,
            message:"Categories fetched successfully",
            data:{
                categories
            }
        });
    }
);

const getCategoryById=asyncHandler(
    async(req:Request, res:Response)=>{
        if(!req.user){
            throw new ApiError(
                "Authentication required",
                401
            );
        }

        const id=req.params.id as string;

        const category=await categoryService.getCategoryById(id, req.user.id)
        
        return sendSuccess({
            res,
            statusCode:200,
            message:"Categorgy fetched successfully",
            data:{
                category
            }
        })
    
    }
)

const updateCategory=asyncHandler(
    async(req:Request, res:Response)=>{
        if(!req.user){
            throw new ApiError(
                "Authentication required",
                401
            );
        }

        const id=req.params.id as string;

        const data=req.body as UpdateCategoryInput;

        const category=await categoryService.updateCategory(id, req.user.id, data)

        return sendSuccess({
            res,
            statusCode:200,
            message:"Category updated successfully",
            data:{
                category
            }
        })
    }
)

const deleteCategory=asyncHandler(
    async(req:Request, res:Response)=>{
        if(!req.user){
            throw new ApiError(
                "Authentication required",
                401
            );
        }


        const id=req.params.id as string;

        const category=await categoryService.deleteCategory(id, req.user.id)
        
        return sendSuccess({
            res,
            statusCode:200,
            message:"Category deleted successfully",
            data:{
                category
            }
        })
    }
)

export{
    createCategory,
    getCategories,
    getCategoryById,
    deleteCategory,
    updateCategory
}