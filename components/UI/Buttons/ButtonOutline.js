import styled from 'styled-components/native'

import { Border, Units, Colors } from '../../../constants/Style'

export default styled.TouchableOpacity`
  border-width: ${Border.borderWidthMedium};
  border-radius: ${Border.borderRadius};
  border-color: ${x => x.color || Colors.semantic.label.default};
  margin-vertical: ${x => Units.scale[x.space || 0]}
  align-items: center;
`
