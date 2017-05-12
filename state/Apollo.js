import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { AsyncStorage } from 'react-native';
import Config from '../config';

import { IntrospectionFragmentMatcher } from 'react-apollo';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "UNION",
          name: "Kind",
          possibleTypes: [
            { name: "Text" },
            { name: "Image" },
            { name: "Link" },
            { name: "Channel" },
            { name: "Attachment" },
            { name: "Embed" },
            { name: "Block" },
          ],
        }, // this is just an example, put your own INTERFACE and UNION types here!
      ],
    },
  }
})

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
    AsyncStorage.getItem('@arena:CurrentUser', (err, result) => {
      if(result) {
        const user = JSON.parse(result);
        req.options.headers['X-AUTH-TOKEN'] = user.authentication_token;
      }
      next();
    })   
  }
}]);

const client = new ApolloClient({
  networkInterface: networkInterface,
  fragmentMatcher: fragmentMatcher
});

export default client;