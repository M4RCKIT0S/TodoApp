const express = require('express');
const userControllers = require('../controllers/UserControllers');
const checkToken = require('../Middlewares/CheckAuth');

const router = express.Router();

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.get('/getUserById',checkToken,userControllers.getUserById);
router.delete('/deleteUser', checkToken,userControllers.deleteUser);
router.patch('/updateUser', checkToken,userControllers.updateUser);

module.exports = router;