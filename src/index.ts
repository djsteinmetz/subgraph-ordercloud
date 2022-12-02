const {ApolloServer, gql} = require('apollo-server');
const {readFileSync} = require('fs');
// const {buildSubgraphSchema} = require('@apollo/subgraph');

const typeDefs = gql(readFileSync('./src/ordercloud.graphql', {encoding: 'utf-8'}));
const resolvers = require('./resolvers');
const OcAPI = require('./datasources/ordercloud-api.ts');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      ordercloudAPI: new OcAPI()
    };
  },
  context: ({req}) => {
    return {token: req.headers.authorization}
  },
});

const port = process.env.PORT || 4001;
const subgraphName = 'ordercloud';

server
  .listen({port})
  .then(({url}) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch(err => {
    console.error(err);
  });