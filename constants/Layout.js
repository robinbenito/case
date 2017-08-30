import {
  Dimensions,
} from 'react-native'

const BLOCK_WIDTH_MULTIPLIER = 0.85

export default {
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
