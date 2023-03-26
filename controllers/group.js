const Group = require('../models/group');
const User = require('../models/user');
const GroupMembers = require('../models/groupMembers');

const createGroup = async (req, res, next) => {
    const user = req.user;
    try {
        const group = await user.createGroup({
            groupName: req.body.groupName
        });
        await GroupMembers.update(
            { admin: true},
            { where: { groupId: group.id, userId: user.id }}
        )
        res.status(201).json({ success: true, group})
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}

const userGroups = async (req, res, next) => {
    const user = req.user;
    try{
        const groups = await user.getGroups();
        res.json({ success: true, groups })
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}

const addGroupUser = async (req, res, next) => {
    const user = req.user;
    try{
        const { groupId } = req.params;
        const userRole = await GroupMembers.findOne({ where: { groupId:groupId, userId:reqUser.id }});
        if(!userRole.admin){
            return res.status(403).json({ success: false, message: 'Unauthorized User'});
        }
        const group = await Group.findByPk(groupId);
        const userEmail = req.body.userEmail;
        console.log(req.body);
        const user = await User.findOne({where: { email: userEmail }});
        if(user){
            const addedUser = await group.addUser([user]);
            res.json({ success: true, message: 'User added Successfuly' });
        }
        else{
            res.status(404).json({ success: false, message: 'Invalid email, No User Found!!' });
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}

const getGroupUsers = async (req, res, next) => {
    try {
        const reqUser = req.user;
        const { groupId } = req.params;
        const groupMembers = await User.findAll({
            attributes: ["id", "name", "email"],
            include: {
                model: Group,
                attributes: [],
                where: { id: groupId }
            }
        });
        res.json({ success: true, groupMembers: groupMembers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}

const deleteGroupUser = async (req, res, next) => {
    try {
        const reqUser = req.user;
        const { groupId, userId } = req.params;
        const userRole = await GroupMembers.findOne({ where: { groupId:groupId, userId:reqUser.id }});
        if(!userRole.admin){
            return res.status(403).json({ success: false, message: 'Unauthorized User'});
        }
        const deleted = await GroupMembers.destroy({ where: { groupId: groupId, userId: userId }});
        if(deleted){
            res.json({ success: true, message: 'User deleted Successfuly' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}

module.exports = {
    createGroup,
    userGroups,
    addGroupUser,
    getGroupUsers,
    deleteGroupUser
}