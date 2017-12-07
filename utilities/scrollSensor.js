import { get } from 'lodash'

export default ({ limit, onOver, onUnder }) => (e) => {
  const offset = get(e, 'nativeEvent.contentOffset.y')

  if (offset && offset >= limit) {
    onOver(offset)
    return e
  }

  if (offset && offset <= limit) {
    onUnder(offset)
    return e
  }

  return e
}
