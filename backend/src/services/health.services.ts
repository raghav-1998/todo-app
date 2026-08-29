import { prisma } from "../db/prisma";

export async function checkDatabaseHealth(){
    await prisma.$queryRaw`SELECT 1`;

    return {
        database:"connected",
    }
}