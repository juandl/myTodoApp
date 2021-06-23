import { Router } from 'express';

//Controllers
import * as TodoController from './todo.controller';

//Utils
const router = Router();

/**
 * GET List of todo in base of user
 */
router.get('/to-do/:user', TodoController.MyListTodos);
/**
 * POST Create a to-do
 */
router.post('/to-do/:user', TodoController.CreateTodoByUser);
/**
 * PUT Update a to-do
 */
router.put('/to-do/:user/:id', TodoController.UpdateTodoById);
/**
 * DELETE Delete a to-do
 */
router.delete('/to-do/:user/:id', TodoController.DeleteTodoById);

export default router;
