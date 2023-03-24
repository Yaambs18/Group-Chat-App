const Chat = require('../models/chat');

const addUserMsg = async (req, res, next) => {
    const user = req.user;
    try{
        const result = await user.createChat({
            message: req.body.msg,
            name: user.name
        });
        res.status(201).json({ success: true, message: 'Message sent successfuly.'});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}

const getMessages = async (req, res, next) => {
    const user = req.user;
    try{
        const result = await Chat.findAll();
        res.status(201).json({ success: true, messages: result});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}

module.exports = {
    addUserMsg,
    getMessages
}