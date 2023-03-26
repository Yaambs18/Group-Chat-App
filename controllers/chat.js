const Chat = require('../models/chat');
const { Op } = require('sequelize');

const addUserMsg = async (req, res, next) => {
    const user = req.user;
    try{
        const userId = req.params.userId;
        const result = await user.createChat({
            message: req.body.msg,
            name: user.name,
            receiverUserId: userId
        });
        res.status(201).json({ success: true, message: result});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}

const addGrpMsg = async (req, res, next) => {
    const user = req.user;
    try{
        const grpId = req.params.groupId;
        console.log(grpId);
        const result = await user.createChat({
            message: req.body.msg,
            name: user.name,
            groupId: grpId
        });
        await result.setGroup(grpId);
        res.status(201).json({ success: true, message: result});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}

const getMessages = async (req, res, next) => {
    const user = req.user;
    try{
        const { category, categoryId, lastMsgId } = req.query;
        if(category === 'group'){
            const result = await Chat.findAll({
                where: {
                    id: {
                        [Op.gt]: lastMsgId
                    },
                    groupId: categoryId
                }
            });
            res.status(201).json({ success: true, messages: result});
        }
        else if(category === 'user'){
            const result = await Chat.findAll({
                where: {
                    [Op.and]: [
                        {userId: user.id},
                        {receiverUserId: categoryId}
                    ]
                }
            });
            res.status(201).json({ success: true, messages: result});
        }
        
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}

module.exports = {
    addUserMsg,
    getMessages,
    addGrpMsg
}