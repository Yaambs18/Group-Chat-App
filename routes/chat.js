const express = require('express');

const router = express.Router();

const authenticatemiddleware = require('../middleware/auth');
const chatController = require('../controllers/chat');

router.post('/userMsg/:userId', authenticatemiddleware.authenticate, chatController.addUserMsg);

router.post('/grpMsg/:groupId', authenticatemiddleware.authenticate, chatController.addGrpMsg);

router.get('/messages', authenticatemiddleware.authenticate, chatController.getMessages);

module.exports = router;