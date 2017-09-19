import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import HTMLView from 'react-native-htmlview'
import styled from 'styled-components/native'

import HTMLViewStyles from '../../../constants/HtmlView'

import { Units } from '../../../constants/Style'

import TabToggle from '../../../components/TabToggle'
import UserAvatar from '../../../components/UserAvatar'
import FollowButtonWithData from '../../../components/FollowButton'

import { BaseIcon } from '../../../components/UI/Icons'
import { SmallButton } from '../../../components/UI/Buttons'
import { H1 } from '../../../components/UI/Texts'
import { P } from '../../../components/UI/Layout'

import NavigationService from '../../../utilities/navigationService'

const tabOptions = {
  Channels: 'CHANNEL',
  Blocks: 'BLOCK',
}

const Header = styled.View`
  flex-direction: row;
  padding-vertical: ${Units.scale[2]};
  padding-horizontal: ${Units.scale[3]};
`

const Avatar = styled(UserAvatar)`
  align-self: center;
`

const Blurb = styled.View`
  flex: auto;
  padding-horizontal: ${Units.scale[2]};
`

const ProfileAction = ({ isTheCurrentUser, user }) => (
  <View>
    {isTheCurrentUser &&
      <SmallButton
        onPress={() => NavigationService.navigate('userSettings')}
      >
        <BaseIcon name="ios-settings" />
      </SmallButton>
    }

    {user.can.follow &&
      <FollowButtonWithData id={user.id} type="USER" />
    }
  </View>
)

const HTML = styled(HTMLView)`
  margin: 0;
`

const ProfileHeader = ({ user, type, onToggle, isTheCurrentUser }) => (
  <View>
    <Header>
      <Avatar user={user} />
      <Blurb>
        <H1>{user.name}</H1>
        <P space={2}>
          <HTML
            value={user.bio || '—'}
            stylesheet={HTMLViewStyles}
            addLineBreaks={false}
          />
        </P>
      </Blurb>
      <ProfileAction user={user} isTheCurrentUser={isTheCurrentUser} />
    </Header>
    <TabToggle
      selectedSegment={type}
      onToggleChange={onToggle}
      options={tabOptions}
    />
  </View>
)

ProfileHeader.propTypes = {
  type: PropTypes.oneOf(['CHANNEL', 'BLOCK']).isRequired,
  onToggle: PropTypes.func,
  user: PropTypes.shape({
    slug: PropTypes.any,
    bio: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    can: PropTypes.any,
  }).isRequired,
  isTheCurrentUser: PropTypes.bool.isRequired,
}

ProfileHeader.defaultProps = {
  onToggle: () => null,
  isTheCurrentUser: false,
}

export default ProfileHeader
