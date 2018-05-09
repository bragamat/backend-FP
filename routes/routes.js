/*jshint esversion:6*/
// "use strict";

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const checkAuth = require('../middleware/check-auth.js')


module.exports = (knex) => {

getComments = (id) =>{
  return new Promise(function (resolve, reject){
    knex
      .select('comment')
      .from('comments')
      .where('route_id', id)
        
      return resolve();
  })
}
  getRoutes = () => { //with ratings
    return knex
      .select('*').from('routes')
      .then((response) => {
        const users = [] 
        for (let i = 0; i < response.length; i++) {
         let comments = []
          getComments(response[i].id)
            .then((result)=>{
              comments.push(result)
            })
         console.log("comming from getRoutes ", comments)
            let info = {
              id: response[i].id,
              name: response[i].name,
              walk_time: response[i].walk_time,
              name: response[i].name,
              user_id: response[i].user_id,
              description: response[i].description,
            }
            users.push(info)
        }
        
        return users
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  getRoute = (id) => {
      return knex('routes')
      .from('routes')
      .where('id','=', id)
      .then(function (response) {
        return response;
      })
  }

  postRoute = (data) =>{
    // console.log('WTFFFF ', data)
    return knex('routes')
    .insert({
      name: data.name,
      walk_time: data.walk_time,
      user_id: data.user_id,
      description: data.description
    }).then((response)=>{
      console.log("coming from postRoute-then", response)
      return response;
    }).catch((err)=>{
      console.log("coming from postRoute ", err)
    })
    
  }

  deleteRoute = (id) =>{
    return knex
    .select()
    .from('routes')
    .where('id', '=', id)
    .delete()
  }
  updateRoute = (id, data) =>{
    console.log("id ", id)
    console.log("data  ", data)

    return knex('routes')
      .where('id', id)
            .update({
              id: id,
              name: data.name,
              walk_time: data.walk_time,
              user_id: data.user_id,
              description: data.description
            })
  }

  refactList = (list)=>{
    loopthrough =(arr)=>{
      let sum=0;
      arr.forEach(number=>{
        sum += number;
      })
      return sum;
    }
    const haveSeenIt = {}
    list.forEach(route =>{
      if(haveSeenIt[route.route_id]){
        haveSeenIt[route.route_id].comments.push(route.comment);

        haveSeenIt[route.route_id].ratings.push(route.ratings);

      } else {
        haveSeenIt[route.route_id] = {
          name: route.name,
          description: route.description,
          walk_time: route.walk_time,
          comments: [route.comment],
          ratings: [route.rating]
        }
      }


    })
    return haveSeenIt;
  }


  router.get("/api/all", (req, res)=>{ //API - json
    // console.log("testing ", checkAuth)
    knex('routes')
    .leftJoin('comments', 'routes.id', 'comments.route_id')
      .leftJoin('ratings', 'routes.id', 'ratings.route_id')
      .select('routes.id as route_id','routes.description' ,'routes.name', 'routes.walk_time', 'comments.comment', 'ratings.rating as rating')
    .then((result) => {
      // console.log("to enviado o result assim ===> ", result)
      const refactoredList = refactList(result)
      // console.log(refactoredList)
          res.json(refactoredList)
        })
    .catch(function(err){
      console.log(err)
          res.send(err)
    })
  })

  router.post('/api/all/new' , (req,res) =>{
    // console.log("wtfffff ", req.body)
    postRoute(req.body)
      .then((result) => {
          // console.log("result comingo from the post route!!! ", result)
        res.redirect('/api/all')
      })
      .catch((err) =>{
        res.send("comging from the post api", err)
      })
  })

  router.delete("/api/:id/delete", (req,res)=>{
    deleteRoute(req.params.id)
    .then((result) =>{
      console.log(result)
      res.json(result)
      
    })
  })

  router.get("/api/:id", (req,res) => {
      console.log(req.params.id)
      getRoute(req.params.id)
        .then((result) => {
          // console.log(result)
          res.json('result')
        })
        .catch(function(err){
          res.send(err)
        });
  });

  router.put("/api/:id/edit", (req, res)=>{
    updateRoute(req.params.id, req.body)
    .then((result)=>{
      res.send(200).json(result)
    })
  })

  router.get("/", (req,res) => { //root route
     knex('routes')
    .join('comments', 'routes.id', 'comments.route_id')
      .select('routes.id as route_id','routes.description' ,'routes.name', 'routes.walk_time', 'comments.comment')
    .then((result) => {
      // console.log("to enviado o result assim ===> ", result)
      const refactoredList = refactList(result)
      // console.log(refactoredList)
      console.log("to enviado o result assim ===> ", refactoredList)
      
          res.render('index', {result: refactoredList})
        })
    .catch(function(err){
      console.log(err)
          res.send(err)
    })
  })

  router.get("/:id", (req,res) => {
      console.log(req.params.id)
      getRoute(req.params.id)

        .then((result) => {
          // console.log(result)
          res.render('showRoute', {result: result})
          console.log(result)
        })
        .catch(function(err){
          res.send(err)
        });
  });

  router.delete("/:id/delete", (req,res)=>{
    deleteRoute(req.params.id)
    .then((result) =>{
      console.log(result)
      res.redirect('/routes')
      
    })
  })

  router.put("/:id/edit", (req, res)=>{
    updateRoute(req.params.id, req.body)
    .then((result)=>{
      res.redirect("/")
    })
  })

  router.post('/new' , (req,res) =>{
    // console.log(req.body)
    postRoute(req.body)
      .then((result) => {
        res.redirect('/routes')
      })
      .catch((err) =>{
        res.send(err)
      })
  })

  return router
}


