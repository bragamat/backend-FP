
exports.seed = function(knex, Promise) {
return knex('comments').del()
    .then(function () {
      return Promise.all([
        knex('comments').insert({comment: 'Wow, is it working??', user_id: 1, route_id: 3}),
        knex('comments').insert({comment: 'wow, I dont think so', user_id: 2, route_id: 2}),
        knex('comments').insert({comment: 'yeah... sooooooooooo', user_id: 3, route_id: 3}),
        knex('comments').insert({comment: 'commenting just to check', user_id: 3, route_id: 2}),
        knex('comments').insert({comment: 'What a great walk!', user_id: 3, route_id: 1}),
        knex('comments').insert({comment: 'I think everybody should go for this walk', user_id: 2, route_id: 2}),
        knex('comments').insert({comment: 'DO NOT take this path after 8 pm', user_id: 1, route_id: 2}),
        knex('comments').insert({comment: 'Im gonna recommend this app to all my friends!', user_id: 2, route_id: 3}),
        knex('comments').insert({comment: 'Thank God I found this app', user_id: 3, route_id: 3}),
        knex('comments').insert({comment: 'Im from Brazil! I really liked Toronto... Thanks to this app', user_id: 2, route_id: 1}),
        knex('comments').insert({comment: 'How come I hadnt seen this app before?', user_id: 1, route_id: 2}),
        knex('comments').insert({comment: 'Immensely thought out! I think clients would love this.', user_id: 2, route_id: 2}),
        knex('comments').insert({comment: 'This type has navigated right into my heart.', user_id: 3, route_id: 3}),
        knex('comments').insert({comment: 'So elegant and minimal dude', user_id: 3, route_id: 2}),
        knex('comments').insert({comment: 'Whoa.', user_id: 3, route_id: 1}),
        knex('comments').insert({comment: 'Engaging. It keeps your mind occupied while you wait.', user_id: 2, route_id: 3}),
        knex('comments').insert({comment: 'Mission accomplished. It was AWESOME!', user_id: 2, route_id: 1}),
        knex('comments').insert({comment: 'You just won the internet!', user_id: 1, route_id: 3}),
        knex('comments').insert({comment: 'Hugely revolutionary concept, friend.', user_id: 1, route_id: 2}),
        knex('comments').insert({comment: 'This concept blew my mind.', user_id: 1, route_id: 1}),
        knex('comments').insert({comment: 'Mission accomplished. Its incredible =)', user_id: 3, route_id: 3}),
        knex('comments').insert({comment: 'Highly thought out! Mmh wondering if this comment will hit the trends as well...', user_id: 3, route_id: 2}),
        knex('comments').insert({comment: 'Incredibly elegant.', user_id: 3, route_id: 1}),
        knex('comments').insert({comment: 'If I could I would. Wether or not I should, I still would.', user_id: 1, route_id: 3}),
        knex('comments').insert({comment: 'SUMMET TIME, LETS GO FOR A WALK!', user_id: 1, route_id: 2}),
        knex('comments').insert({comment: 'Life is full of temporary situations, ultimately ending in a permanent solution. Go for a walk!', user_id: 2, route_id: 2}),
        knex('comments').insert({comment: 'If I could I would. Wether or not I should, I still would.', user_id: 1, route_id: 1}),
        knex('comments').insert({comment: 'SUMMER TIME, LETS GO FOR A WALK!', user_id: 2, route_id: 1}),
        knex('comments').insert({comment: "Sorry, I can't hangout. My uncle's cousin's sister in law's best friend's insurance agent's roommate's pet goldfish died. Maybe next time.", user_id: 2, route_id: 2}),
        knex('comments').insert({comment: 'If I could I would. Wether or not I should, I still would.', user_id: 2, route_id: 3}),


      ])
    }).catch((err)=>{
      console.log("from the 6_commentsRoutes", err)

    })
}
