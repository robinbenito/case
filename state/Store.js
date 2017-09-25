import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import client from './Apollo'

const initialRoutesState = {
  current: null,
}

export const SET_CURRENT_ROUTE = 'SET_CURRENT_ROUTE'

function routesReducer(state = initialRoutesState, { type, current }) {
  switch (type) {
    case SET_CURRENT_ROUTE:
      return { ...state, current }
    default:
      return state
  }
}

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    routes: routesReducer,
  }),
  compose(
    applyMiddleware(client.middleware()),
  ),
)

export default store
