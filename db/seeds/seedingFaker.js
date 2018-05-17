exports.seed = function(knex, Promise) {
    return knex('comments').del()
      .then(function () {
      while (limit > 0){
        console.log("here is the limit ",limit)
        return Promise.all([
          knex('comments').insert({route_id:1 , comment:'Wow, I hope you can check this path, I found amazing!', user_id: 1}),
          knex('comments').insert({route_id:2 , comment:'just a tip, DONT DO THIS WALK ON NIGHT TIME', user_id: 2}),
          knex('comments').insert({route_id:3 , comment:'Did you see that incredible door ?', user_id: 3}),
        ]);
        limit--;
      }      
      }).catch((err)=>{
        console.log("from the 8_routesF", err)
      });

};
