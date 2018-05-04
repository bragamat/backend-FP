
exports.seed = function(knex, Promise) {
  return knex('routes').del()
    .then(function () {
      return Promise.all([
        knex('routes').insert({name: 'Spadina Path', walk_time: 10, user_id:1}),
        knex('routes').insert({name: 'Dufferin Path', walk_time: 20, user_id: 3}),
        knex('routes').insert({name: 'Brasil Avenue Path', walk_time: 15, user_id: 2})
      ]);
    });
};
