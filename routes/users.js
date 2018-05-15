/*jshint esversion:6 */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
// const aws = require('aws-sdk')
// const morgan  = require('morgan')
// const bodyParser  = require("body-parser");
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname);
  }
})

const upload = multer({ storage });


// const config = require('./config.js')
// const s3 = new aws.S3();

// s3.config.update({
//   accessKeyId: config.accessKeyId,
//   secretAccessKey: config.secretAccessKey,
//   region: 'us-west-2'
// })



// app.use(morgan('combined'))

module.exports = (knex) => {

  function getUsers() {
    return knex
      .select('*').from('users_table')
      .then(function (response) {
        console.log(response);
        const users = []; // was polls
        for (let i = 0; i < response.length; i++) {
            let info = {
              id: response[i].id,
              name: response[i].name,
              password: response[i].password,
              profilePicture: response[i].profilePicture
            };
            users.push(info);
        }
        return users;
      });
  }

  function getUser(id) {
    return knex
      .select('*').from('users_table')
      .where('id', id)
      .then(function (response) {
        return response
      });
  }

  addUser = (data, file)=>{
    return knex('users_table')
      .insert({
        name: data.name,
        password: data.password,
        profilePicture: file.path
      })

  }

  doLogin = (data)=>{
    return knex('users_table')
        users_table.where({
          name: data.name,
          password: data.password})
          .then((response)=>{
            return response
          }).catch(err=>{
            console.log(err)
          })
  }


  router.get("/", (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      getUsers()
        .then((result) => {
          res.json(result);
        })
        .catch(function(err){
          res.send(err);
        });
  });

  router.get('/:id', (req,res)=>{
    getUser(req.params.id)
    .then(user=>{
      console.log(user)
     res.json(user)
    })
  })

  router.post('/new', upload.single('profilePicture'),(req, res)=>{
    console.log(req.file)
    addUser(req.body, req.file)
      .then((response)=>{
        res.redirect('/users')
      })
  })

  router.post('/login', (req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization")
    doLogin(req.body)
      .then(user =>{
        if(user.length < 1){
          return res.send(404).json({
            message:'USER NOT FOUND'
          })
        }
     const token = jwt.sign({
          name: user.name,
          password: user.password}, 
          'secret_key', 
          {
            expiresIn: '1h'
          })

        return res.json({
            message:'Auth Successful',
            token: token
          })
      }).catch((err)=>{
        res.json(err)
        console.log(err)
      })
  })

  return router;
};


