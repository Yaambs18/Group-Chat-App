const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

const authenticatemiddleware = require('../middleware/auth');

router.post('/signup', userController.addUser);

router.post('/login', userController.loginUser);

router.get('/', authenticatemiddleware.authenticate, userController.getUsers)

module.exports = router;