import { Router } from "express";
import { healthController } from "../controllers/health.controller";

const router=Router()

router.route('/').get(healthController)

export default router