import { AsyncStorage } from 'react-native'

let CURRENT_USER

const ASYNC_STORAGE_KEY = '@arena:CurrentUser'

const get = async () => {
  if (CURRENT_USER) return CURRENT_USER

  const currentUser = await AsyncStorage.getItem(ASYNC_STORAGE_KEY)
  const parsedCurrentUser = JSON.parse(currentUser)

  CURRENT_USER = parsedCurrentUser

  return CURRENT_USER
}

const localSet = ({ id, slug, name, authentication_token }) => {
  CURRENT_USER = { id, slug, name, authentication_token }
  return CURRENT_USER
}

const set = currentUser =>
  AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(localSet(currentUser)))

const isLoggedIn = async () =>
  await get() !== null

const clear = () => {
  CURRENT_USER = null
  return AsyncStorage.removeItem(ASYNC_STORAGE_KEY)
}

const sync = {
  get: () => CURRENT_USER,
  isLoggedIn: () => CURRENT_USER !== null,
}

export default {
  set,
  get,
  clear,
  isLoggedIn,
  sync,
}
