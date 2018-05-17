
exports.seed = function(knex, Promise) {
return knex('comments').del()
    .then(function () {
      return Promise.all([
        knex('comments').insert({id: 1, comment: 'Lots of people on this route, so much emptier on the weekends', user_id: 1, route_id: 1}),
        knex('comments').insert({id: 2, comment: 'Great path for dog walking, plenty of green space', user_id: 2, route_id: 1}),
        knex('comments').insert({id: 3, comment: 'Decent walk, not the greatest parts of the city but still some good photo ops', user_id: 3, route_id: 1}),
        knex('comments').insert({id: 4, comment: 'There are also a bunch of great restaurants in the area', user_id: 4, route_id: 1}),

        knex('comments').insert({id: 5, comment: 'Not a dog friendly area, too many no dog signs', user_id: 4, route_id: 2}),
        knex('comments').insert({id: 6, comment: 'I like this walk, no dogs around and I hate dogs', user_id: 3, route_id: 2}),
        knex('comments').insert({id: 7, comment: 'There is a great shot of Toronto from the north east side', user_id: 2, route_id: 2}),
        knex('comments').insert({id: 8, comment: 'This is probably the smelliest area of Toronto', user_id: 1, route_id: 2}),

        knex('comments').insert({id: 9, comment: 'Prefer green space, still a good walk but no quite down my alley', user_id: 1, route_id: 3}),
        knex('comments').insert({id: 10, comment: 'A walk to remember', user_id: 3, route_id: 3}),
        knex('comments').insert({id: 11, comment: 'My friend Christopher and I were walkin and we did not know... how we got here.. it is unbelieveable, Wow!', user_id: 2, route_id: 3}),
        knex('comments').insert({id: 12, comment: 'i could tolerate this walk', user_id: 4, route_id: 3})
      ])
    }).catch((err)=>{
      console.log("from the 6_commentsRoutes", err)

    })
}
