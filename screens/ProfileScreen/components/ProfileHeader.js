import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { Units, Typography } from '../../../constants/Style'
import TabToggle from '../../../components/TabToggle'
import UserAvatar from '../../../components/UserAvatar'
import HTML from '../../../components/HTML'
import FollowButtonWithData from '../../../components/FollowButton'
import { BaseIcon } from '../../../components/UI/Icons'
import { SmallButton } from '../../../components/UI/Buttons'
import { Section } from '../../../components/UI/Layout'
import NavigationService from '../../../utilities/navigationService'

const Container = styled.View`
  margin-bottom: ${Units.base};
`

const Header = styled.View`
  flex-direction: row;
  padding-top: ${Units.scale[3]};
  padding-horizontal: ${Units.scale[3]};
  padding-bottom: ${Units.scale[4]};
`

const Name = styled.Text`
  margin-right: ${Units.scale[2]};
  margin-bottom: ${Units.scale[3]};
  font-size: ${Typography.fontSize.h1};
  font-weight: ${Typography.fontWeight.medium};
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

ProfileAction.propTypes = {
  user: PropTypes.shape({
    can: PropTypes.any,
  }).isRequired,
  isTheCurrentUser: PropTypes.bool.isRequired,
}

const ProfileHeader = ({ user, type, onToggle, isTheCurrentUser }) => {
  const TAB_OPTIONS = {
    [`${user.counts.channels} Channels`]: 'CHANNEL',
    [`${user.counts.blocks} Blocks`]: 'BLOCK',
  }

  return (
    <Container>
      <Header>
        <Avatar user={user} />
        <Blurb>
          <Name>{user.name}</Name>
          <Section space={2}>
            <HTML value={user.bio || '—'} />
          </Section>
        </Blurb>

        <ProfileAction
          user={user}
          isTheCurrentUser={isTheCurrentUser}
        />
      </Header>
      <TabToggle
        selectedSegment={type}
        onToggleChange={onToggle}
        options={TAB_OPTIONS}
      />
    </Container>
  )
}

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
  isTheCurrentUser: PropTypes.bool,
}

ProfileHeader.defaultProps = {
  onToggle: () => null,
  isTheCurrentUser: false,
}

export default ProfileHeader
