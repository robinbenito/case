import { pick } from 'lodash'
import { AsyncStorage } from 'react-native'

let CURRENT_USER

const ASYNC_STORAGE_KEY = '@arena:CurrentUser'

export const SERIALIZED_ATTRIBUTES = [
  'id',
  'slug',
  'name',
  'authentication_token',
  'is_pending_confirmation',
]

const get = async (attr = null) => {
  if (CURRENT_USER) return CURRENT_USER

  const currentUser = await AsyncStorage.getItem(ASYNC_STORAGE_KEY)
  const parsedCurrentUser = JSON.parse(currentUser)

  CURRENT_USER = parsedCurrentUser

  return attr ? CURRENT_USER[attr] : CURRENT_USER
}

const localSet = x => pick(x, SERIALIZED_ATTRIBUTES)

const set = currentUser =>
  AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(localSet(currentUser)))

const isLoggedIn = async () =>
  await get() !== null

const clear = () => {
  CURRENT_USER = null
  return AsyncStorage.removeItem(ASYNC_STORAGE_KEY)
}

const sync = {
  get: (attr = null) => (attr ? CURRENT_USER[attr] : CURRENT_USER),
  isLoggedIn: () => CURRENT_USER !== null,
}

export default {
  set,
  get,
  clear,
  isLoggedIn,
  sync,
}
