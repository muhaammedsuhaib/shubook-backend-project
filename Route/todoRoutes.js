import express from 'express';
import { addTodo,deleteTodo, editTodo, userData } from '../Controller/TodoController.js';

const route=express.Router();

route.get('/:id/userData',userData)
route.post('/:userId/add',addTodo);
route.put('/edit/:id',editTodo);
route.delete('/remove/:id',deleteTodo);

export default route;