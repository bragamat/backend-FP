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
  deleteComment = (comment_id) =>{
    return knex('comments')
      .where('id', comment_id)
        .delete()
  }
  refactList = (list)=>{
    const haveSeenIt = {}
    list.forEach((route, index) =>{
      if(haveSeenIt[route.route_id]){
        haveSeenIt[route.route_id].comments.push({[route.user_name]: [route.comment]});
        haveSeenIt[route.route_id].ratings.push(route.ratings);
        haveSeenIt[route.route_id].mapsdata.push(route.place_id);
        haveSeenIt[route.route_id].waypoint.push({[route.WLat]: [route.WLong]});


      } else {

        // 'waypoints.latitude as WLat','waypoints.longitude as WLong'
        haveSeenIt[route.route_id] = {
          id: route.route_id,
          name: route.name,
          description: route.description,
          walk_time: route.walk_time,
          mapsdata_id: route.mapsdata,
          starts: [route.SLati, route.SLong],
          ends: [route.ELati, route.ELong],
          waypoint: [{[route.WLat]: [route.WLong]}], // hard-code
          mapsdata: [route.place_id],
          comments: [{
            [route.user_name]: [route.comment]}
            ],
          ratings: [route.rating]
        }
      }
    }); 
      for(let item in haveSeenIt){
        for(let key in haveSeenIt[item]){
          if(key == 'mapsdata'){
            haveSeenIt[item].mapsdata = haveSeenIt[item].mapsdata.filter(x => x) 
          } else if (key == 'ratings'){
            haveSeenIt[item].ratings = haveSeenIt[item].ratings.filter(x => x) 
          } else if (key == 'comments'){
             haveSeenIt[item].comments.forEach((comment, index) =>{
                if(Object.keys(comment) == 'null'){
                  delete haveSeenIt[item].comments[index]
                }  
              }); 
          } else if (key == 'starts'){
            haveSeenIt[item].starts = haveSeenIt[item].starts.filter(x => x) 

          } else if (key == 'ends'){
            haveSeenIt[item].ends = haveSeenIt[item].ends.filter(x => x) 

          }
          haveSeenIt[item].comments = haveSeenIt[item].comments.filter( x => x) 
        }
      }
    return haveSeenIt;
  }
  postMap = (map)=>{
    return knex('mapsdata')
      .insert({
        geocoder_status: map.geocoder_status,
        route_id: map.route_id
      })
  }
  postMapRoute = (place, mapId) =>{
    return knex('places')
      .insert({
        map_id: mapId,
        place_id: place.place_id
      }).catch((err)=>{
        console.log('this error ',err)
      })
  }
  router.post('/api/all/new' , (req,res) =>{ // creating a new route
    postRoute(req.body)
      .then((result) => {
          // console.log("result comingo from the post route!!! ", result)
        res.redirect('/routes/api/all')
      })
      .catch((err) =>{
        res.send("comging from the post api", err)
      })
  })
  router.post('/api/map/new', (req, res) =>{ // creating a new map
    postMap(req.body)
      .then((result)=>{
        res.send(200)
      })
  })
  router.post('/api/map/:id/new', (req,res)=>{ //Adding places to the map
    postMapRoute(req.body, req.params.id)
      .then((result)=>{
        res.send(200) 
      }).catch((err)=>{
        console.log(err)
      })
  })
  router.delete("/api/:id/comment/:comment_id/delete", (req,res)=>{//deleting comments from the parent route
    deleteComment(req.params.comment_id)
    .then((result) =>{
      // console.log(result)
      res.json(result)
      
    }).catch(err=>{
      console.log(err)
    })
  })
  router.get("/api/all", /*checkAuth,*/    (req, res, next)=>{ //API - json
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // console.log(req.userData.iat)
    // localStorage.setItem("token", req.userData.iat );

    knex('routes')
    .leftJoin('comments', 'routes.id', 'comments.route_id')
      .leftJoin('ratings', 'routes.id', 'ratings.route_id')
        .leftJoin('users_table', 'comments.user_id', 'users_table.id')
          .leftJoin('mapsdata', 'routes.id','mapsdata.route_id')
            .leftJoin('places', 'mapsdata.id', 'places.map_id')
              .leftJoin('starts', 'mapsdata.id', 'starts.map_id')
                .leftJoin('ends', 'mapsdata.id', 'ends.map_id')
                  .leftJoin('waypoints', 'mapsdata.id', 'waypoints.map_id')
      .select('waypoints.latitude as WLat','waypoints.longitude as WLong','ends.longitude as ELong', 'ends.latitude as ELati','starts.latitude as SLati', 'starts.longitude as SLong','places.place_id as place_id','mapsdata.id as mapsdata','users_table.name as user_name', 'routes.id as route_id','routes.description' ,'routes.name', 'routes.walk_time', 'comments.comment', 'ratings.rating as rating')
    .then((result) => {
      const refactoredList = refactList(result)
          res.json(refactoredList)
        })
    .catch(function(err){
      console.log(err)
          res.send(err)
    })
  })
  postComment = (data, route_id) =>{
    console.log("receiving data like this ",data)
    return knex('comments')
      .insert({
        comment: data.comment,
        route_id: route_id,
        user_id: data.user_id
      })
  }
  router.post('/api/:id/comment/new', (req, res) => {// Posting a new comment whitin a route
    postComment(req.body, req.params.id)
      .then((result)=>{
        res.redirect(`/routes/api/all`)
      })
      .catch(err=>{
        console.log(err)
      })
  })
  router.delete("/api/:id/delete", (req,res)=>{ //deleting a route
    deleteRoute(req.params.id)
    .then((result) =>{
      // console.log(result)
      res.json(result)
      
    })
  })
  getRoute = (id) => {
      return knex('routes')
      .from('routes', 'comments')
      .where('id','=', id)
      .join('comments', 'routes.id', 'comments.route_id')
      .then(function (response) {
        return response;
      })
  }  
  router.get("/api/:id", (req,res) => { //get one route at a time
    knex('routes')
    .leftJoin('comments', 'routes.id', 'comments.route_id')
      .leftJoin('ratings', 'routes.id', 'ratings.route_id')
        .leftJoin('users_table', 'comments.user_id', 'users_table.id')
          .leftJoin('mapsdata', 'routes.id','mapsdata.route_id')
            .leftJoin('places', 'mapsdata.id', 'places.map_id')
          .where('routes.id', req.params.id)
        .select('places.place_id as place_id','mapsdata.id as mapsdata','users_table.name as user_name', 'routes.id as route_id','routes.description' ,'routes.name', 'routes.walk_time', 'comments.comment', 'ratings.rating as rating')
    .then((result) => {
      const refactoredList = refactList(result)
          res.json(refactoredList)
        })
        .catch(function(err){
          res.send(err)
        });
  });
  router.put("/api/:id/edit", (req, res)=>{ // Updating a route
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
          const refactoredList = refactList(result)
          // console.log("to enviado o result assim ===> ", refactoredList)
            res.render('index', {result: refactoredList})
        }).catch(function(err){
            console.log(err)
              res.send(err)
          })
  })
  router.get("/:id", (req,res) => {
      getRoute(req.params.id)
        .then((result) => {
          res.render('showRoute', {result: result})
        })
        .catch(function(err){
          res.send(err)
        });
  });
  router.delete("/:id/delete", (req,res)=>{
    deleteRoute(req.params.id)
    .then((result) =>{
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
    postRoute(req.body)
      .then((result) => {
        res.redirect('/routes')
      })
      .catch((err) =>{
        res.send(err)
      })
  })

  addStartingPoint = (route_id, map_id, data) =>{
    console.log("receiving data like this ", data, map_id)
    return knex('starts')
        .insert({
          longitude: data.longitude,
          latitude: data.latitude,
          map_id: map_id
        })
        .catch(err=>{
          console.log(err)
        })
  }


  router.post('/api/:id/map/:map_id/start/new', (req, res) => {
    addStartingPoint(req.params.id, req.params.map_id, req.body)
      .then(result=>{
        res.send(202)
      })
      .catch(err=>{
        console.log(err)
      })
  })

  addEndingPoint = (route_id, map_id, data) =>{
    console.log("receiving data like this ", data, map_id)
    return knex('ends')
        .insert({
          longitude: data.longitude,
          latitude: data.latitude,
          map_id: map_id
        })
        .catch(err=>{
          console.log(err)
        })
  }

  router.post('/api/:id/map/:map_id/end/new', (req, res) => {
    addEndingPoint(req.params.id, req.params.map_id, req.body)
      .then(result=>{
        res.send(202)
      })
      .catch(err=>{
        console.log(err)
      })
  })

  addWayPoints = (map_id, data) =>{
    return knex('waypoints')
      .insert({
        latitude: data.latitude,
        longitude: data.longitude,
        map_id: map_id
      })
      .catch(err=>{
        console.log(err)
      })
  }

router.post('/api/:id/map/:map_id/waypoint/new', (req,res) =>{
  addWayPoints(req.params.map_id, req.body)
    .then(result =>{
      res.send(200)
    })
    .catch(err=>{
      console.log(err)
    })
})



















  return router
}


