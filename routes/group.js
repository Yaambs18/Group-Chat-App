const express = require('express');

const groupController = require('../controllers/group');
const authenticatemiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/createGroup', authenticatemiddleware.authenticate, groupController.createGroup);

router.post('/:groupId/addUser', authenticatemiddleware.authenticate, groupController.addGroupUser);

router.get('/:groupId/users', authenticatemiddleware.authenticate, groupController.getGroupUsers);

router.delete('/:groupId/user/:userId', authenticatemiddleware.authenticate, groupController.deleteGroupUser);

router.get('/', authenticatemiddleware.authenticate, groupController.userGroups);

module.exports = router;