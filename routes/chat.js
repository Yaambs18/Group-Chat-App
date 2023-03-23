const express = require('express');

const router = express.Router();

const authenticatemiddleware = require('../middleware/auth');
const chatController = require('../controllers/chat');

router.post('/userMsg', authenticatemiddleware.authenticate, chatController.addUserMsg);

module.exports = router;