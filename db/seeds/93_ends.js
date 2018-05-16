
exports.seed = function(knex, Promise) {
  return knex('ends').del()
    .then(function () {
      return Promise.all([
        knex('ends').insert({latitude: 43.637049, longitude: -79.390783, map_id: 1}),
        knex('ends').insert({latitude: 43.637794, longitude: -79.408507, map_id: 2}),
        knex('ends').insert({latitude: 43.644021, longitude: -79.364090, map_id: 3})
      ]);
    }).catch((err)=>{
      console.log("from 92_starts.js", err)

    })
};
