// Here we require a file that is not checked in, so
// ignore this error
/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { IntrospectionFragmentMatcher } from 'react-apollo'
import userDefaults from 'react-native-user-defaults'

import Config from '../config'
import CurrentUser from '../utilities/currentUserService'
import fragmentSchema from './fragmentSchema'
import { trackError, trackEvent } from '../utilities/analytics'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: fragmentSchema.data,
})

const networkInterface = createNetworkInterface({
  uri: Config.API_ENDPOINT,
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {} // Create the header object if needed.
    }

    req.options.headers['X-APP-TOKEN'] = Config.X_APP_TOKEN

    CurrentUser.get()
      .then((user) => {
        req.options.headers['X-AUTH-TOKEN'] = user.authentication_token

        // Set user defaults for share extension
        trackEvent({ category: 'Log', action: 'Setting defaults' })
        userDefaults.set('authToken', user.authentication_token, 'group.com.arenashare')
          .then(() => trackEvent({ category: 'Log', action: 'Success saving auth' }))
          .catch(error => trackError(error))
        userDefaults.set('appToken', Config.X_APP_TOKEN, 'group.com.arenashare')
          .then(() => trackEvent({ category: 'Log', action: 'Success saving app token' }))
          .catch(error => trackError(error))
        next()
      })
      .catch(next)
  },
}])

const client = new ApolloClient({
  networkInterface,
  fragmentMatcher,
})

export default client
