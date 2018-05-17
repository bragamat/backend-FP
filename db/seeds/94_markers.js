
exports.seed = function(knex, Promise) {
  return knex('route_markers').del()
    .then(function () {
      return Promise.all([
        knex('route_markers').insert({longitude: 43.642263 , latitude: -79.384241 , map_id: 1}),
        knex('route_markers').insert({longitude: 43.641774 , latitude: -79.386 , map_id: 1}),
        knex('route_markers').insert({longitude: 43.640431 , latitude: -79.388264 , map_id: 1}),
        knex('route_markers').insert({longitude: 43.64149 , latitude: -79.379123 , map_id: 2}),
        knex('route_markers').insert({longitude: 43.642117, latitude: -79.377272 , map_id: 2})

      ]);
    }).catch((err)=>{
      console.log("route markers upload", err)

    })
};
