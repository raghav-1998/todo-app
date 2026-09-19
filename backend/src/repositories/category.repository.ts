import { prisma } from "../db/prisma"
import { CreateCategoryInput, UpdateCategoryInput } from "../types/category.types";

export class CategoryRepository{
    async createCategory(data:CreateCategoryInput){
        return prisma.category.create({
            data:{
                name:data.name,
                // color:data.color,
                ...(data.color!== undefined &&{
                    color:data.color
                }),
                userId:data.userId
            }
        });
    }

    async findCategoryById(id:string, userId:string){
        return prisma.category.findFirst({
            where:{
                id,
                userId
            }
        })
    }

    async findCategoriesByUserId(userId:string){
        return prisma.category.findMany({
            where:{
                userId
            },
            orderBy:{
                createdAt:"desc"
            }
        })
    }

    async findCategoryByName(
        userId:string,
        name:string
    ){
        return prisma.category.findUnique({
            where:{
                userId_name:{
                    userId,
                    name
                }
            }
        })
    }

    async updateCategory(
        id: string,
        userId: string,
        data: UpdateCategoryInput
    ) {
        const category = await prisma.category.findFirst({
            where: {
                id,
                userId,
            },
        });

        if (!category) {
            return null;
        }

        return prisma.category.update({
            where: {
                id
            },
            data,
        });
    }

    async deleteCategory(id:string, userId:string){
        const category=await prisma.category.findFirst({
            where:{
                id,
                userId
            }
        })

        if(!category){
            return null
        }

        await prisma.category.delete({
            where:{
                id
            }
        })

        return category
    }
}