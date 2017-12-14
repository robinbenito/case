import React from 'react'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'

import { Units, Typography, Colors, Border } from '../../../constants/Style'

const Container = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`

const SelectedChannel = styled.TouchableOpacity`
  margin-right: ${Units.scale[2]};
  margin-vertical: ${Units.scale[1]};
  border-width: ${Border.borderWidthMedium};
  border-radius: ${Border.borderRadius};
  padding-horizontal: ${Units.scale[2]};
  padding-vertical: ${Units.scale[1] / 2};
  flex-direction: row;
  align-items: center;
`

const Close = styled(Ionicons)`
  padding-left: ${Units.scale[1]};
  position: relative;
  bottom: -1;
`

const Title = styled.Text`
  font-weight: ${Typography.fontWeight.bold};
`

export default class SelectedChannels extends React.Component {
  render() {
    const { selectedConnections, onRemove } = this.props

    return (
      <Container>
        {Object.keys(selectedConnections).map((id) => {
          const channel = selectedConnections[id]
          const foregroundColor = Colors.channel[channel.visibility]
          const backgroundColor = Colors.channel.background[channel.visibility]

          return (
            <SelectedChannel
              key={`connection-${channel.id}`}
              onPress={() => onRemove(channel)}
              style={{ backgroundColor, borderColor: foregroundColor }}
            >
              <Title style={{ color: foregroundColor }}>
                {channel.title}
              </Title>

              <Close
                name="ios-close-outline"
                size={20}
                color={foregroundColor}
              />
            </SelectedChannel>
          )
        })}
      </Container>
    )
  }
}

SelectedChannels.propTypes = {
  selectedConnections: PropTypes.object.isRequired, // TODO: object of channel fragments
  onRemove: PropTypes.func,
}

SelectedChannels.defaultProps = {
  onRemove: () => null,
  selectedConnections: {},
}
