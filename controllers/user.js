const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const generateToken = async function (id){
    return jwt.sign({ userId: id }, process.env.TOKEN_SECRET);
}

function isStringInvalid(string){
    if(string == undefined || string.length === 0){
        return true;
    }
    else{
        return false;
    }
}

const addUser = async (req, res, next) => {
    try {        
        const { name, email, phoneNumber, password } = req.body;

        if(isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(phoneNumber) || isStringInvalid(password)){
            return res.status(400).json({err : 'Bad Parameters: Something is missing'});
        }

        const passHash = await bcrypt.hash(password, 10);
        await User.create({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            password: passHash
        })
        res.status(201).json({succes: true, message: 'Successfuly signed up'});
    }
    catch(err) {
        console.log(err);
        if(err.message == 'Validation error'){
            res.status(409).json({succes: false, message: 'User already exists, Please Login'})
        }
        else{
            res.sendStatus(500).json({succes: false, message: err});        
        }
    }
}

const loginUser = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        if(isStringInvalid(email) || isStringInvalid(password)){
            return res.status(400).json({ success: false, message : 'Bad Parameters: Something is missing'});
        }
        const user = await User.findOne({ where: { email: email }});
        if(!user) {
            return res.status(404).json({ success: false, message: 'User Not Found, Please Sign Up!' });
        }

        const result = await bcrypt.compare(password, user.password);
        if(result){
            const jwtToken = await generateToken(user.id);
            res.json({success: true, token: jwtToken, message: 'User Login Successful'});
        }
        else {
            res.status(401).json({success: false, message: "User not authorized !!!"});
        }        
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Something went wrong, Please try again !!' });
    }
}

module.exports = {
    addUser,
    loginUser
}