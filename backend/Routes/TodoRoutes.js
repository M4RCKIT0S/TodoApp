const express = require('express');
const todoControllers = require('../controllers/TodoControllers');
const checkAuth = require('../Middlewares/CheckAuth');

const router = express.Router();

router.post('/createTodo', checkAuth, todoControllers.createTodo);
router.delete('/deleteTodo/:id', checkAuth, todoControllers.deleteTodo)

module.exports = router;