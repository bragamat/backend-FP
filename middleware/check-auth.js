  
const jwt = require('jsonwebtoken')
const bodyParser  = require("body-parser");

module.exports =  (req, res, next) => {
    try{
      const token = req.headers.authorization.split(' ')[1];
      console.log("the actual token ",token)
      const decoded = jwt.verify(token, 'secret_key')
      req.userData = decoded
      console.log("what is it ? " ,req.userData)
      next();
    }catch (error){
      console.log("this is the checkAuth =>>>> ", error)
      return res.status(401).json({
        message: "auth failed",
        token: req.userData
      })
    }
  }