import { prisma } from "../db/prisma"

export class CategoryRepository{
    async createCategory(data:{
        name:string,
        color?:string,
        userId:string
    }){
        return prisma.category.create({
            data:{
                name:data.name,
                color:data.color,
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

    async updateCategory(
        id: string,
        userId: string,
        data: {
        name?: string;
        color?: string | null;
        }
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