const bcrypt = require('bcrypt');

const User = require('../models/user');

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
        res.status(201).json({succes: true, message: 'Successfully created a new user'});
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500).json({succes: false, Error: err});        
    }
}

module.exports = {
    addUser
}