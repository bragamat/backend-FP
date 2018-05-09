/*jshint esversion:6 */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

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

  addUser = (data)=>{
    return knex('users_table')
      .insert({
        name: data.name,
        password: data.password
      })

  }

  doLogin = (data)=>{
    return knex('users_table')
        .where({
          name: data.name,
          password: data.password})
          .then((response)=>{
            return response
          }).catch(err=>{
            console.log(err)
          })
  }


  router.get("/", (req,res) => {
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
     res.json(user)
    })
  })

  router.post("/new", (req, res)=>{
    addUser(req.body)
      .then((response)=>{
        res.json(response)
      })
  })

  router.post('/login', (req, res)=>{
    doLogin(req.body)
      .then(user =>{
        if(user.length < 1){
          return res.send(404).json({
            message:'USER NOT FOUND'
          })
        }
     const token = jwt.sign({
          name: user.name,
          password: user.password
        }, 
          'secrete key', 
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


