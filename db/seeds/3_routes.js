
exports.seed = function(knex, Promise) {
  return knex('routes').del()
    .then(function () {
      return Promise.all([
        knex('routes').insert({id: 1, name: 'Harbourfront Path', description: "A walk along harbourfront, down by the water.  A great spot to walk the dog, or just sit and contemplate.  Great cafes in the area as well" ,walk_time: 30, user_id:1}),
        knex('routes').insert({id: 2, name: 'Fort York Path',description: "A sweet walk from the SkyDome along Bremner, crossing the old trainyard outside of Steamwhisle.  Continue along the path, slowly turning into Fort York and take in the art and green space along the way", walk_time: 40, user_id: 3}),
        knex('routes').insert({id: 3, name: 'Sugar Beach',description: "Take a walk along the harbourfront starting at the Westin Hotel and making your way down towards Sugar Beach.  A great spot to enjoy some rays!", walk_time: 20, user_id: 2}),
        knex('routes').insert({id: 4, name: 'High Park',description: "A long walk through high park from the south side up towards Bloor Street.  Path is mainly on the main route, plenty of exterior paths to adventure in if you're in the mood!", walk_time: 60, user_id: 1})

      ]);
    }).catch((err)=>{
      console.log("comingo from 3_routes ", err)
    })
};
