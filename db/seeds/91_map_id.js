
exports.seed = function(knex, Promise) {
  return knex('mapsdata').del()
    .then(function () {
      return Promise.all([
        knex('mapsdata').insert({route_id: 1}),
        knex('mapsdata').insert({route_id: 2}),
        knex('mapsdata').insert({route_id: 3})
      ]);
    }).catch((err)=>{
      console.log("from 92_starts.js", err)

    })
};
