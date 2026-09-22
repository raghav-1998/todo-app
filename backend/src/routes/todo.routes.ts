import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createTodoSchema, todoFiltersSchema, todoIdSchema, updateTodoSchema } from "../validators/todo.validators";
import { createTodo, deleteTodo, getTodoById, getTodos, updateTodo } from "../controllers/todo.controller";

const router=Router();

router.route('/').post(requireAuth, validate(createTodoSchema), createTodo);

router.route('/').get(requireAuth, validate(todoFiltersSchema), getTodos);

router.route('/:id').get(requireAuth, validate(todoIdSchema), getTodoById);

router.route("/:id").patch(requireAuth, validate(updateTodoSchema), updateTodo);

router.route("/:id").delete(requireAuth, validate(todoIdSchema), deleteTodo)

export default router;

