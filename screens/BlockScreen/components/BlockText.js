import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native'
import HTMLView from 'react-native-htmlview'

import { Border, Units } from '../../../constants/Style'
import HTMLStyles from '../../../constants/HtmlView'
import HeaderAwareContainer from '../../../components/UI/Layout/HeaderAwareContainer'

const Wrapper = styled.View`
  border-width: ${Border.borderWidth};
  border-color: ${Border.borderColor};
  padding-horizontal: ${Units.scale[2]};
  padding-vertical: ${Units.scale[2]};
  margin-horizontal: ${Units.scale[2]};
  margin-vertical: ${Units.scale[2]};
`

export default class BlockText extends React.Component {
  render() {
    const { block } = this.props.navigation.state.params

    return (
      <HeaderAwareContainer>
        <ScrollView>
          <Wrapper>
            <HTMLView
              value={block.kind.displayContent || block.kind.content}
              stylesheet={HTMLStyles}
            />
          </Wrapper>
        </ScrollView>
      </HeaderAwareContainer>
    )
  }
}

BlockText.propTypes = {
  navigation: PropTypes.any.isRequired,
}
