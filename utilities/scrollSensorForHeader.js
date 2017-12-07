import scrollSensor from './scrollSensor'

import { SET_HEADER_TITLE_VISIBILITY } from '../state/actions'
import Store from '../state/Store'

const VISIBILITY_LIMIT = 150

const dispatch = visibility =>
  Store.dispatch({
    type: SET_HEADER_TITLE_VISIBILITY,
    isHeaderTitleVisible: visibility,
  })

const sensor = scrollSensor({
  limit: VISIBILITY_LIMIT,
  onOver: () => dispatch(true),
  onUnder: () => dispatch(false),
})

sensor.dispatch = dispatch

export default sensor
