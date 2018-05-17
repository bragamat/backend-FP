
exports.seed = function(knex, Promise) {
  return knex('routes').del()
    .then(function () {
      return Promise.all([
        knex('routes').insert({id: 1, name: 'Sugar Beach', walk_time: 10, user_id:1}),
        knex('routes').insert({id: 2, name: 'Lakefront West', walk_time: 20, user_id: 3}),
        knex('routes').insert({id: 3, name: 'Athletic Path', walk_time: 15, user_id: 2})
      ]);
    }).catch((err)=>{
      console.log("comingo from 3_routes ", err)
    })
};
