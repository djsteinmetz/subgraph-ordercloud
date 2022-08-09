const {ApolloServer, gql} = require('apollo-server');
const {readFileSync} = require('fs');
// const {buildSubgraphSchema} = require('@apollo/subgraph');

const typeDefs = gql(readFileSync('./ordercloud.graphql', {encoding: 'utf-8'}));
const resolvers = require('./resolvers');
const OrderCloudAPI = require('./datasources/ordercloud-api');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      ordercloudAPI: new OrderCloudAPI()
    };
  },
  context: ({req}) => {
    return {token: req.headers.authorization}
  },
  formatError: (error) => {
    return new Error("Something went wrong")
  }
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