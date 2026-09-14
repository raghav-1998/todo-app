import { Router } from "express";
import { getCurrentUser, login, logout, refresh, register } from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validators";
import { requireAuth } from "../middleware/auth.middleware";

const router=Router();

router.route('/register').post(validate(registerSchema), register);
router.route('/login').post(validate(loginSchema), login);

router.route('/me').get(requireAuth, getCurrentUser);
router.route('/logout').post(logout)

router.route('/refresh').post(refresh)
export default router