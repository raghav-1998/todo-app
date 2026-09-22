import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { categoryIdSchema, createCategorySchema, updateCategorySchema } from "../validators/category.schema";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/category.controller";

const router=Router();

router.route('/').post(requireAuth, validate(createCategorySchema), createCategory);

router.route('/').get(requireAuth, getCategories);

router.route('/:id').get(requireAuth, validate(categoryIdSchema), getCategoryById);

router.route('/:id').patch(requireAuth, validate(updateCategorySchema), updateCategory);

router.route('/:id').delete(requireAuth, validate(categoryIdSchema), deleteCategory);

export default router;