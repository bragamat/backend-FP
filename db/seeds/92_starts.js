
exports.seed = function(knex, Promise) {
  return knex('starts').del()
    .then(function () {
      return Promise.all([
        knex('starts').insert({latitude: 43.638229, longitude: -79.3797, map_id: 1}),
        knex('starts').insert({latitude: 43.642204, longitude: -79.38410, map_id: 2}),
        knex('starts').insert({latitude: 43.641925, longitude: -79.3754518, map_id: 3})
      ]);
    }).catch((err)=>{
      console.log("from 92_starts.js", err)

    })
};
