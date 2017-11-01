import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import ChannelResult from './ChannelResult'
import ConnectableResult from './ConnectableResult'
import UserResult from './UserResult'

import { Units, Border, Colors } from '../../constants/Style'

import navigationService from '../../utilities/navigationService'

const HitArea = styled.TouchableOpacity`
`

const Container = styled.View`
  justify-content: center;
  padding-vertical: ${Units.scale[2]};
  padding-right: ${Units.scale[3]};
  margin-left: ${Units.scale[3]};
  border-bottom-color: ${Border.borderColor};
  border-bottom-width: ${Border.borderWidth};
`

class SearchResult extends Component {
  onPress = () => {
    const { item } = this.props

    switch (item.__typename) {
      case 'Channel':
        navigationService.navigate('channel', {
          id: item.id,
          title: item.title,
          color: Colors.channel[item.visibility],
        })
        break
      case 'Connectable':
        navigationService.navigate('block', {
          id: item.id,
          title: item.title,
        })
        break
      case 'User':
        navigationService.navigate('profile', {
          id: item.id,
          title: item.name,
        })
        break
      default:
        break
    }
  }

  render() {
    let result

    const { item } = this.props

    switch (item.__typename) {
      case 'Connectable':
        result = <ConnectableResult connectable={item} />
        break
      case 'User':
        result = <UserResult user={item} />
        break
      case 'Channel':
        result = <ChannelResult channel={item} />
        break
      default:
        break
    }

    return (
      <Container>
        <HitArea onPress={this.onPress}>
          {result}
        </HitArea>
      </Container>
    )
  }
}

SearchResult.fragments = {
  channel: ChannelResult.fragments.channel,
  user: UserResult.fragments.user,
  connectable: ConnectableResult.fragments.connectable,
}

SearchResult.propTypes = {
  item: PropTypes.object.isRequired,
}

export default SearchResult
