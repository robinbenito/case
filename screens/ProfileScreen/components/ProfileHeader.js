import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { pickBy } from 'lodash'
import styled from 'styled-components/native'

import { Units, Typography } from '../../../constants/Style'
import TabToggle from '../../../components/TabToggle'
import UserAvatar from '../../../components/UserAvatar'
import HTML from '../../../components/HTML'
import FollowButtonWithData from '../../../components/FollowButton'
import { SmallButton } from '../../../components/UI/Buttons'
import NavigationService from '../../../utilities/navigationService'
import { pluralize } from '../../../utilities/inflections'

const cogIcon = require('../../../assets/images/settings.png')

const Container = styled.View`
  margin-bottom: ${Units.scale[2]};
`

const Header = styled.View`
  flex-direction: row;
  padding-top: ${Units.scale[3]};
  padding-horizontal: ${Units.scale[3]};
  padding-bottom: ${Units.scale[4]};
`

const Name = styled.Text`
  margin-bottom: ${Units.scale[1]};
  font-size: ${Typography.fontSize.h1};
  font-weight: ${Typography.fontWeight.medium};
`

const Avatar = styled(UserAvatar)`
  align-self: flex-start;
`

const Bio = styled(HTML)`
`

const Blurb = styled.View`
  flex: auto;
  padding-horizontal: ${Units.scale[2]};
`

const SettingsIcon = styled.Image.attrs({
  source: cogIcon,
})`
  margin-top: 1;
  width: 15;
  height: 15;
  align-self: center;
`

const Button = styled(SmallButton)`
  padding-horizontal: ${Units.scale[1]};
`

const ProfileAction = ({ isTheCurrentUser, user }) => (
  <View>
    {isTheCurrentUser &&
      <Button
        onPress={() => NavigationService.navigate('userSettings')}
      >
        <SettingsIcon />
      </Button>
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
  let TAB_OPTIONS = {
    [pluralize(user.counts.channels, 'Channel')]: 'CHANNEL',
    [pluralize(user.counts.blocks, 'Block')]: 'BLOCK',
  }

  // Remove blocks tab if there are none
  if (user.counts.blocks === 0) {
    TAB_OPTIONS = pickBy(TAB_OPTIONS, value => value !== 'BLOCK')
  }

  return (
    <Container>
      <Header>
        <Avatar user={user} />
        <Blurb>
          <Name>{user.name}</Name>
          <Bio value={user.bio || '<p>—</p>'} />
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
