
exports.seed = function(knex, Promise) {
  return knex('route_pics').del()
    .then(function () {
      return Promise.all([
        knex('route_pics').insert({}),
        knex('route_pics').insert({}),
        knex('route_pics').insert({}),
      ]);
    }).catch((err)=>{
      console.log("from the 8_routesF", err)
    });
};
