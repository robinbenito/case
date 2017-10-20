import { isEqual } from 'lodash'

export default ({ navigation, state, fields, headerRight }) => {
  if (!isEqual(state, fields)) {
    navigation.setOptions({ headerRight })
    return true
  }

  navigation.setOptions({ headerRight: null })
  return false
}
