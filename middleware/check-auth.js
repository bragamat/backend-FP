  
const jwt = require('jsonwebtoken')
const bodyParser  = require("body-parser");

module.exports =  (req, res, next) => {
    try{
      const token = req.headers.authorization.split(' ')[1];
      console.log(token)
      const decoded = jwt.verify(token, 'secret key')
      req.userData = decoded
      console.log(req.userData)
      next();
    }catch (error){
      return res.status(401).json({
        message: "auth failed",
        token: req.userData
      })
    }
  }