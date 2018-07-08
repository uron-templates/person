const router = require('koa-router')();
{{#graphql}}
const {graphqlKoa, graphiqlKoa} = require('apollo-server-koa');
const schema = require('../schema');
{{/graphql}}
const home = require('./home');

router.use('', home.routes());

{{#graphql}}
// graphql
router.post('/graphql', graphqlKoa({ schema }));
router.get('/graphql', graphqlKoa({ schema }));
router.get(
  '/graphiql',
  graphiqlKoa({
    endpointURL: '/graphql' // a POST endpoint that GraphiQL will make the actual requests to
  })
);
{{/graphql}}

module.exports = router;
