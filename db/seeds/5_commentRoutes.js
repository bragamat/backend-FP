
exports.seed = function(knex, Promise) {
return knex('comments').del()
    .then(function () {
      return Promise.all([
        knex('comments').insert({comment: 'Lots of people on this route, so much emptier on the weekends', user_id: 1, route_id: 1}),
        knex('comments').insert({comment: 'Decent walk, not the greatest parts of the city but still some good photo ops', user_id: 2, route_id: 1}),
        knex('comments').insert({comment: 'There are also a bunch of great restaurants in the area', user_id: 3, route_id: 1}),
        knex('comments').insert({comment: 'What a great walk!', user_id: 3, route_id: 1}),
        knex('comments').insert({comment: 'I think everybody should go for this walk', user_id: 2, route_id: 2}),
        knex('comments').insert({comment: 'There is a great shot of Toronto from the north east side', user_id: 1, route_id: 1}),
        knex('comments').insert({comment: 'Im gonna recommend this app to all my friends!', user_id: 2, route_id: 3}),
        knex('comments').insert({comment: 'Super Happy I found this app', user_id: 3, route_id: 3}),
        knex('comments').insert({comment: 'Im from Brazil! I really liked Toronto... Thanks to this app', user_id: 2, route_id: 1}),
        knex('comments').insert({comment: 'How come I hadnt seen this app before?', user_id: 1, route_id: 2}),
        knex('comments').insert({comment: 'Immensely thought out! I think clients would love this.', user_id: 2, route_id: 2}),
        knex('comments').insert({comment: 'This type has navigated right into my heart.', user_id: 3, route_id: 3}),
        knex('comments').insert({comment: 'So elegant and minimal dude', user_id: 3, route_id: 2}),
        knex('comments').insert({comment: 'My friend Christopher and I were walkin and we did not know... how we got here.. it is unbelieveable, Wow!', user_id: 3, route_id: 1}),
        knex('comments').insert({comment: 'Engaging. It keeps your mind occupied while you wait.', user_id: 2, route_id: 3}),
        knex('comments').insert({comment: 'Hugely revolutionary concept, friend.', user_id: 1, route_id: 2}),
        knex('comments').insert({comment: 'This concept blew my mind.', user_id: 1, route_id: 1}),
        knex('comments').insert({comment: 'Highly thought out! Mmh wondering if this comment will hit the trends as well...', user_id: 3, route_id: 2}),
        knex('comments').insert({comment: 'Incredibly elegant.', user_id: 3, route_id: 1}),
        knex('comments').insert({comment: 'Great walk through the park', user_id: 1, route_id: 4}),
        knex('comments').insert({comment: 'It is a pretty long walk, make sure you have some spare time to tour around', user_id: 4, route_id: 4}),
        knex('comments').insert({comment: 'Very dog friendly! Plenty off-leash areas around the park and an easy path to follow for the dogs', user_id: 2, route_id: 4}),
        knex('comments').insert({comment: 'A great Toronto gem, sweet green space', user_id: 1, route_id: 4}),
        knex('comments').insert({comment: 'Nice long walk through the park, there a bunch of great side paths if you live off the beaten trail', user_id: 2, route_id: 4}),
        knex('comments').insert({comment: 'SUMMET TIME, LETS GO FOR A WALK!', user_id: 1, route_id: 2}),
        knex('comments').insert({comment: 'Life is full of temporary situations, ultimately ending in a permanent solution. Go for a walk!', user_id: 2, route_id: 2}),
        knex('comments').insert({comment: 'SUMMER TIME, LETS GO FOR A WALK!', user_id: 2, route_id: 1})
      ])
    }).catch((err)=>{
      console.log("from the 6_commentsRoutes", err)

    })
}
