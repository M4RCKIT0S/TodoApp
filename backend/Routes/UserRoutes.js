const express = require('express');
const userControllers = require('../controllers/UserControllers');

const router = express.Router();

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.get('/getUserById' ,userControllers.getUserById);
router.delete('/deleteUser', userControllers.deleteUser);
router.patch('/updateUser', userControllers.updateUser);

module.exports = router;