
exports.seed = function(knex, Promise) {
  return knex('routes').del()
    .then(function () {
      return Promise.all([
        knex('routes').insert({id: 1, name: 'Spadina Path', walk_time: 10, user_id:1}),
        knex('routes').insert({id: 2, name: 'Dufferin Path', walk_time: 20, user_id: 3}),
        knex('routes').insert({id: 3, name: 'Brasil Avenue Path', walk_time: 15, user_id: 2}),
        knex('routes').insert({id: 4, name: 'Brasil Avenue Path', walk_time: 15, user_id: 2}),
        knex('routes').insert({id: 5, name: 'Brasil Avenue Path', walk_time: 15, user_id: 2}),
        knex('routes').insert({id: 6, name: 'Brasil Avenue Path', walk_time: 15, user_id: 2}),
        knex('routes').insert({id: 7, name: 'Brasil Avenue Path', walk_time: 15, user_id: 2}),
        knex('routes').insert({id: 8, name: 'Brasil Avenue Path', walk_time: 15, user_id: 2}),
        knex('routes').insert({id: 9, name: 'Brasil Avenue Path', walk_time: 15, user_id: 2}),
        knex('routes').insert({id: 10, name: 'Brasil Avenue Path', walk_time: 15, user_id: 2}),
        knex('routes').insert({id: 11, name: 'Brasil Avenue Path', walk_time: 15, user_id: 2}),
        knex('routes').insert({id: 12, name: 'Brasil Avenue Path', walk_time: 15, user_id: 2}),
        knex('routes').insert({id: 13, name: 'Brasil Avenue Path', walk_time: 15, user_id: 2}),
        knex('routes').insert({id: 14, name: 'Brasil Avenue Path', walk_time: 15, user_id: 2}),
        knex('routes').insert({id: 15, name: 'Brasil Avenue Path', walk_time: 15, user_id: 2}),
        knex('routes').insert({id: 16, name: 'Brasil Avenue Path', walk_time: 15, user_id: 2}),
        knex('routes').insert({id: 17, name: 'Brasil Avenue Path', walk_time: 15, user_id: 2}),
        knex('routes').insert({id: 18, name: 'Brasil Avenue Path', walk_time: 15, user_id: 2}),
        knex('routes').insert({id: 19, name: 'Brasil Avenue Path', walk_time: 15, user_id: 2}),
        knex('routes').insert({id: 20, name: 'Brasil Avenue Path', walk_time: 15, user_id: 2}),
      
      ]);
    }).catch((err)=>{
      console.log("comingo from 3_routes ", err)
    })
};
