
exports.up = function(knex, Promise) {
 return Promise.all([
    knex.schema.table('users_table', function(table){   
    table.string('profilePicture')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users_table', function(table){
      table.dropColumn('profilePicture')
    })
  ])
}