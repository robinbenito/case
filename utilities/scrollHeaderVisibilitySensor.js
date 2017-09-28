import { get } from 'lodash'
import { SET_HEADER_TITLE_VISIBILITY } from '../state/actions'
import Store from '../state/Store'

const VISIBILITY_LIMIT = 150

const dispatch = visibility =>
  Store.dispatch({
    type: SET_HEADER_TITLE_VISIBILITY,
    isHeaderTitleVisible: visibility,
  })

const sensor = (e) => {
  const offset = get(e, 'nativeEvent.contentOffset.y')

  if (offset && offset >= VISIBILITY_LIMIT) {
    return dispatch(true)
  }

  if (offset && offset <= VISIBILITY_LIMIT) {
    return dispatch(false)
  }

  return false
}

sensor.dispatch = dispatch

export default sensor
