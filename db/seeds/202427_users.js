
exports.seed = function(knex, Promise) {
  return knex('users_table').del()
    .then(function () {
    return Promise.all([
        knex('users_table').insert({id: 1, name: 'Mateus', password: '123'}),
        knex('users_table').insert({id: 2, name: 'Mike', password:'123'}),
        knex('users_table').insert({id: 3, name: 'Jude', password:'123'}),
        knex('users_table').insert({id: 4, name: 'Cristian', password:'123'}),
        knex('users_table').insert({id: 5, name: 'Michael', password:'123'}),
        knex('users_table').insert({id: 6, name: 'Frank', password:'123'}),
        knex('users_table').insert({id: 7, name: 'Kyle', password:'123'}),
        knex('users_table').insert({id: 8, name: 'Sam', password:'123'}),
        knex('users_table').insert({id: 9, name: 'James', password:'123'}),
        knex('users_table').insert({id: 10, name: 'Braga', password:'123'})
      ]);
    }).catch((err)=>{
      console.log("coming from 2024_users ", err )
    })
};
