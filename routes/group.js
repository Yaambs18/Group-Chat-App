const express = require('express');

const groupController = require('../controllers/group');
const authenticatemiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/createGroup', authenticatemiddleware.authenticate, groupController.createGroup);

router.post('/:groupId/addUser', authenticatemiddleware.authenticate, groupController.addGroupUser)

router.get('/', authenticatemiddleware.authenticate, groupController.userGroups);

module.exports = router;