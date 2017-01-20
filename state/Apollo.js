import ApolloClient, { createNetworkInterface } from 'apollo-client';
import Config from '../config';

const networkInterface = createNetworkInterface({
  uri: 'https://api.are.na/graphql',
  dataIdFromObject: o => o.id
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    console.log('Config.X_APP_TOKEN', Config.X_APP_TOKEN)
    req.options.headers['X-APP-TOKEN'] = Config.X_APP_TOKEN;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface: networkInterface
});

export default client;