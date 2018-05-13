
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('places',function(table){
    table.increments();
    table.string('place_id')
    table.integer('map_id').references('id').inTable('mapsdata')
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('places')
};
