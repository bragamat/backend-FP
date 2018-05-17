
exports.up = function(knex, Promise) {
 return Promise.all([
    knex.schema.createTable('ratings', function(table){   
    table.increments();
    table.integer('rating');
    // table.integer('user_id').references('id').inTable('users_table');
    })
  ])
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ratings');
  
};
