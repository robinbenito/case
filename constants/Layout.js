// DO NOT USE DEFINITIONS FROM THIS FILE
// DO NOT ADD DEFINITIONS TO THIS FILE
// TODO: Delete this file

import {
  Dimensions,
} from 'react-native'

const BLOCK_WIDTH_MULTIPLIER = 0.85

export default {
  unit: 10,
  borderRadius: 3,
  padding: 10,
  infoWidth: 260,
  topbar: 70,
  subtabbar: 40,
  feedBlock: Dimensions.get('window').width * BLOCK_WIDTH_MULTIPLIER,
  window: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
}
