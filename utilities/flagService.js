import AsyncStorage from './AsyncStorage'

const YES = 'YES'

const keyify = k => `flags:${k}`

const flag = key =>
  AsyncStorage.setItem(key, YES)

export default {
  keyify,

  // Setting `silent` to `true` allows you to check the value
  // without tripping it.
  // TODO: Accept an `expires` timestamp
  check: (k, { silent = false } = {}) => {
    const key = keyify(k)

    return AsyncStorage
      .getItem(key)

      .then((flagged) => {
        if (flagged === YES) return Promise.resolve(true)

        if (!silent) {
          return flag(key, YES)
            .then(() => false)
        }

        return false
      })

      .catch(() => false)
  },

  flag: k =>
    flag(keyify(k)),

  reset: k =>
    AsyncStorage.removeItem(keyify(k)),
}
