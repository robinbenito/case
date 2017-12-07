import scrollSensor from './scrollSensor'

import { SET_ADD_BUTTON_VISIBILITY } from '../state/actions'
import Store from '../state/Store'

const VISIBILITY_LIMIT = 2

const dispatch = visibility =>
  Store.dispatch({
    type: SET_ADD_BUTTON_VISIBILITY,
    isAddButtonVisible: visibility,
  })

const sensor = scrollSensor({
  limit: VISIBILITY_LIMIT,
  onOver: () => dispatch(true),
  onUnder: () => dispatch(false),
})

sensor.dispatch = dispatch

export default sensor
