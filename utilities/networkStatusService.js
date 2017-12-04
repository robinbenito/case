import { every, map } from 'lodash'

// See the source for networkStatus @:
// https://github.com/apollographql/apollo-client/blob/master/packages/apollo-client/src/core/networkStatus.ts

const STATUSES = {
  // The query has never been run before and the query is now currently running. A query will still
  // have this network status even if a partial data result was returned from the cache, but a
  // query was dispatched anyway.
  1: 'loading',

  // If `setVariables` was called and a query was fired because of that then the network status
  // will be `setVariables` until the result of that query comes back.
  2: 'setVariables',

  // Indicates that `fetchMore` was called on this query and that the query created is currently in
  // flight.
  3: 'fetchMore',

  // Similar to the `setVariables` network status. It means that `refetch` was called on a query
  // and the refetch request is currently in flight.
  4: 'refetch',

  // Indicates that a polling query is currently in flight. So for example if you are polling a
  // query every 10 seconds then the network status will switch to `poll` every 10 seconds whenever
  // a poll request has been sent but not resolved.
  6: 'poll',

  // No request is in flight for this query, and no errors happened. Everything is OK.
  7: 'ready',

  // No request is in flight for this query, but one or more errors were detected.
  8: 'error',
}

const networkStatusService = status => ({
  name: STATUSES[status],
  is: {
    inFlight: status < 7,
    // `is.loading` is distinct from the `{ data: { loading } }` property,
    // which is `true` when `inFlight`
    loading: status === 1,
    settingVariables: status === 2,
    fetchingMore: status === 3,
    refreshing: status === 4,
    ready: status === 7,
  },
})

export const networkStatusesService = (statuses = []) => {
  const services = statuses.map(networkStatusService)

  return {
    names: map(services, 'name'),
    is: {
      inFlight: every(map(services, 'is.inFlight')),
      loading: every(map(services, 'is.loading')),
      settingVariables: every(map(services, 'is.settingVariables')),
      fetchingMore: every(map(services, 'is.fetchingMore')),
      refreshing: every(map(services, 'is.refreshing')),
      ready: every(map(services, 'is.ready')),
    },
  }
}

export default networkStatusService
