const express = require('express');
const upload = require('express-fileupload');

const router = express.Router();

const authenticatemiddleware = require('../middleware/auth');
const chatController = require('../controllers/chat');

router.post('/userMsg/:userId', authenticatemiddleware.authenticate, chatController.addUserMsg);

router.post('/grpMsg/:groupId', authenticatemiddleware.authenticate, chatController.addGrpMsg);

router.post('/uploadFile/userMsg/:userId', authenticatemiddleware.authenticate, upload(), chatController.uploadUserMsgFile);

router.post('/uploadFile/grpMsg/:groupId', authenticatemiddleware.authenticate, upload(), chatController.uploadGrpMsgFile);

router.get('/messages', authenticatemiddleware.authenticate, chatController.getMessages);

module.exports = router;