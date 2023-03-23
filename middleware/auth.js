const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = (req, res, next) => {

    try {
        const token = req.header('Authorization');
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = user.userId;
        next();

      } 
      catch(err) {
        console.log(err);
        return res.status(401).json({success: false, message: 'Unauthorised user'});
      }

}

module.exports = {
  authenticate
}