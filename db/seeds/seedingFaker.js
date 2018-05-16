// import Faker from 'faker'
var faker = require('faker');

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties

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
