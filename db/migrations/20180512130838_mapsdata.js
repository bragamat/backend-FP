
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('mapsdata', function(table){
      table.increments();
      table.string('geocoder_status');
      table.integer('route_id').references('id').inTable('routes')
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('mapsdata');
};
