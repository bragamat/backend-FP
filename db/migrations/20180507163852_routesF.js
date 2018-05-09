
exports.up = function(knex, Promise) {
 return Promise.all([
    knex.schema.table('routes', function(table){   
    // table.integer('comment_id').references('id').inTable('comments');
    // table.integer('like_id').references('id').inTable('likes');
    // table.integer('pin_id').references('id').inTable('pins');
    // table.integer('rating_id').references('id').inTable('ratings');
    table.string('super_spot');


      
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('routes', function(table){
      table.dropColumn('comment_id')
      table.dropColumn('like_id')
      table.dropColumn('pin_id')
      table.dropColumn('rating_id')
      table.dropColumn('super_spot')

    })
  ])
}