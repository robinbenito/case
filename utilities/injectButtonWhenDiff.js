import { isEqual } from 'lodash'

import { updateHeader } from '../components/SubmittableHeader'

export default ({ state, fields, headerRight }) => {
  if (!isEqual(state, fields)) {
    updateHeader({ headerRight })
    return true
  }

  updateHeader({ headerRight: null })
  return false
}
