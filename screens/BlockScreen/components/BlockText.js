import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native'
import HTMLView from 'react-native-htmlview'

import { Border, Units } from '../../../constants/Style'
import HTMLStyles from '../../../constants/HtmlView'

const Wrapper = styled.View`
  border-width: ${Border.borderWidth};
  border-color: ${Border.borderColor};
  padding: ${Units.scale[2]}px;
  margin: ${Units.scale[2]}px;
`

export default class BlockText extends React.Component {
  render() {
    const { block } = this.props.navigation.state.params

    return (
      <ScrollView>
        <Wrapper>
          <HTMLView
            value={block.kind.content}
            stylesheet={HTMLStyles}
            addLineBreaks={null}
            numberOfLines={12}
          />
        </Wrapper>
      </ScrollView>
    )
  }
}

BlockText.propTypes = {
  navigation: PropTypes.any.isRequired,
}
