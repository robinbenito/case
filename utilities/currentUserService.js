import { pick, isEmpty } from 'lodash'
import { AsyncStorage } from 'react-native'
import { gql } from 'react-apollo'

let CURRENT_USER

const ASYNC_STORAGE_KEY = '@arena:CurrentUser'

export const SERIALIZABLE_ATTRIBUTES = [
  'id',
  'slug',
  'name',
  'authentication_token',
  'is_pending_confirmation',
]

export const LoginFragment = gql`
  fragment Login on Me {
    ${SERIALIZABLE_ATTRIBUTES.join(' ')}
  }
`

const get = async (attr = null) => {
  if (CURRENT_USER) return CURRENT_USER

  const currentUser = await AsyncStorage.getItem(ASYNC_STORAGE_KEY)
  const parsedCurrentUser = JSON.parse(currentUser)

  CURRENT_USER = parsedCurrentUser

  return attr ? CURRENT_USER[attr] : CURRENT_USER
}

const localSet = (attributes) => {
  CURRENT_USER = pick(attributes, SERIALIZABLE_ATTRIBUTES)
  return CURRENT_USER
}

const set = currentUser =>
  AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(localSet(currentUser)))

const isLoggedIn = async () =>
  await get() !== null

const clear = () => {
  CURRENT_USER = {}
  return AsyncStorage.removeItem(ASYNC_STORAGE_KEY)
}

const sync = {
  get: (attr = null) => (attr ? CURRENT_USER[attr] : CURRENT_USER),
  isLoggedIn: () => !isEmpty(CURRENT_USER),
}

export default {
  set,
  get,
  clear,
  isLoggedIn,
  sync,
}
