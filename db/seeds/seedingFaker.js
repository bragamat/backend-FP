// import Faker from 'faker'
var faker = require('faker');

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties
let limit = 10;
exports.seed = function(knex, Promise) {
    return knex('users_table').del()
      .then(function () {
      while (limit > 0){
        console.log("here is the limit ",limit)
        return Promise.all([
          knex('users_table').insert({name: faker.name.findName(), password: 123}),
          knex('users_table').insert({name: faker.name.findName(), password: 123}),
          knex('users_table').insert({name: faker.name.findName(), password: 123}),
        ]);
        limit--;
      }      
      }).catch((err)=>{
        console.log("from the 8_routesF", err)
      });

};
