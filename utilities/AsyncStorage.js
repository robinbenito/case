import { AsyncStorage } from 'react-native'

const PREFIX = '@arena'

const keyify = key =>
  `${PREFIX}:${key}`

export default {
  getItem: key =>
    AsyncStorage.getItem(keyify(key)),

  setItem: (key, value) =>
    AsyncStorage.setItem(keyify(key), value),

  removeItem: key =>
    AsyncStorage.removeItem(keyify(key)),

  setData: (key, value) =>
    AsyncStorage.setItem(keyify(key), JSON.stringify(value)),

  getData: key =>
    AsyncStorage.getItem(keyify(key))
      .then(value => JSON.parse(value)),

  getAllKeys: () =>
    AsyncStorage.getAllKeys(),
}
