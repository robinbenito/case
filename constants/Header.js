import { HEADER_HEIGHT } from '../components/Header'
import { Colors, Typography } from './Style'

export default {
  headerTintColor: Colors.semantic.text,
  headerBackTitle: null,
  headerStyle: {
    height: HEADER_HEIGHT,
    backgroundColor: 'white',
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.semantic.text,
  },
}
