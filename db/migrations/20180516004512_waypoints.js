
exports.up = function(knex, Promise) {
 return Promise.all([
    knex.schema.createTable('waypoints', function(table){   
    table.increments()
    table.float('longitude')
    table.float('latitude')
    table.integer('map_id').references('id').inTable('mapsdata')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('waypoints')
  ])
}