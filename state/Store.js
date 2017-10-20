import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import client from './Apollo'
import * as reducers from './reducers'

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    routes: reducers.routes,
    ui: reducers.ui,
    info: reducers.info,
  }),
  compose(
    applyMiddleware(client.middleware()),
  ),
)

export default store
