const express = require('express');
const todoControllers = require('../controllers/TodoControllers');
const checkAuth = require('../Middlewares/CheckAuth');

const router = express.Router();

router.post('/createTodo', checkAuth, todoControllers.createTodo);
router.delete('/deleteTodo/:id', checkAuth, todoControllers.deleteTodo);
router.patch('/updateTodo/:id', checkAuth, todoControllers.updateTodo);
router.get('/getTodosByUserId', checkAuth, todoControllers.getTodosByUserId);
router.get('/getUserTodo/:id', checkAuth, todoControllers.getUserTodo);
router.patch('/editTodo/:id',checkAuth, todoControllers.editTodo);
router.get('/getTodosByPriority', checkAuth, todoControllers.getUserTodosByPriority);

module.exports = router;