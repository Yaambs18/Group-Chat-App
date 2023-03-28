const Chat = require('../models/chat');
const { Op } = require('sequelize');

const S3Services = require('../services/S3services');

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
                [Op.or]: [
                  {
                    [Op.and]: [
                      { userId: user.id },
                      { receiverUserId: categoryId },
                    ],
                  },
                  {
                    [Op.and]: [
                      { userId: categoryId },
                      { receiverUserId: user.id },
                    ],
                  },
                ],
              },
            });
            res.status(201).json({ success: true, messages: result});
        }
        
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}

const uploadUserMsgFile = async (req, res, next) => {
    const user = req.user;
    try{
        const userId = req.params.userId;
        const uploadedFile = req.files;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        const fileUrl = await S3Services.uploadToS3(uploadedFile.file.data, uploadedFile.file.name);
        const result = await user.createChat({
            message: uploadedFile.file.name,
            name: user.name,
            receiverUserId: userId,
            msgFile: fileUrl
        });
        res.status(201).json({ success: true, message: result});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}

const uploadGrpMsgFile = async (req, res, next) => {
    const user = req.user;
    try{
        const grpId = req.params.groupId;
        const uploadedFile = req.files;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        const fileUrl = await S3Services.uploadToS3(uploadedFile.file.data, uploadedFile.file.name);
        const result = await user.createChat({
            message: uploadedFile.file.name,
            name: user.name,
            groupId: grpId,
            msgFile: fileUrl
        });
        await result.setGroup(grpId);
        res.status(201).json({ success: true, message: result});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}

module.exports = {
    addUserMsg,
    getMessages,
    addGrpMsg,
    uploadUserMsgFile,
    uploadGrpMsgFile
}