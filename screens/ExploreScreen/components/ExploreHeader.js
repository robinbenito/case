import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import TabToggle from '../../../components/TabToggle'
import { H2, Strong } from '../../../components/UI/Texts'
import { Units, Typography, Colors } from '../../../constants/Style'

import navigationService from '../../../utilities/navigationService'

const Container = styled.View`
  margin-bottom: ${Units.scale[2]};
`

const HeadlineWrapper = styled.View`
  padding-horizontal: ${Units.scale[4]};
  padding-vertical: ${Units.scale[3]};
`

const Headline = styled(H2)`
  font-weight: ${Typography.fontWeight.bold};
  text-align: center;
  padding-bottom: ${Units.scale[3]};
`

const Subheadline = styled(H2)`
  text-align: center;
  font-weight: ${Typography.fontWeight.normal};
`

class ExploreHeader extends Component {
  render() {
    const { type, onToggle, showHeadline } = this.props

    const TAB_OPTIONS = {
      'Recent Channels': 'CHANNEL',
      'Recent Blocks': 'CONNECTABLE',
    }

    return (
      <Container>
        {showHeadline &&
          <HeadlineWrapper>
            <Headline>Welcome to Are.na</Headline>
            <Subheadline>
              Start by exploring recent channels and blocks. Or just go to your
              <Strong onPress={() => navigationService.navigate('profile')}> Profile</Strong>.
            </Subheadline>
          </HeadlineWrapper>
        }
        <TabToggle
          selectedSegment={type}
          onToggleChange={onToggle}
          options={TAB_OPTIONS}
          color={Colors.black}
        />
      </Container>
    )
  }
}

ExploreHeader.propTypes = {
  type: PropTypes.oneOf(['CHANNEL', 'BLOCK']).isRequired,
  onToggle: PropTypes.func,
  showHeadline: PropTypes.bool,
}

ExploreHeader.defaultProps = {
  onToggle: () => null,
  showHeadline: false,
}

export default ExploreHeader
