import { Router } from "express";
import healthRouter from "./health.routes"
import authRouter from "./auth.routes"
import todoRouter from "./todo.routes"
import categoryRouter from "./category.routes"

const router= Router()

router.use('/health', healthRouter);
router.use('/auth',authRouter);
router.use('/todos',todoRouter)
router.use('/categories',categoryRouter)

export default router