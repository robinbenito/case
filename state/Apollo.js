import ApolloClient, { createNetworkInterface } from 'apollo-client';
import Config from '../config';

const networkInterface = createNetworkInterface({
  uri: Config.API_ENDPOINT,
  dataIdFromObject: o => o.id
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    req.options.headers['X-APP-TOKEN'] = Config.X_APP_TOKEN;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface: networkInterface
});

export default client;