import express from 'express';
import { addTodo, deleteTodo, editTodo, showAll } from '../Controller/TodoController.js';

const route=express.Router();

route.get('/all',showAll)
route.post('/add',addTodo);
route.put('/edit/:id',editTodo);
route.delete('/remove/:id',deleteTodo);

export default route;