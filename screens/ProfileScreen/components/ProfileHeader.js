import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { pickBy } from 'lodash'
import styled from 'styled-components/native'

import ProfileActions from './ProfileActions'
import TabToggle from '../../../components/TabToggle'
import UserAvatar from '../../../components/UserAvatar'
import HTML from '../../../components/HTML'

import { pluralize } from '../../../utilities/inflections'

import { Units, Typography } from '../../../constants/Style'

const Container = styled.View`
  margin-bottom: ${Units.scale[2]};
`

const Name = styled.Text`
  margin-bottom: ${Units.scale[1]};
  font-size: ${Typography.fontSize.h1};
  font-weight: ${Typography.fontWeight.semiBold};
  text-align: center;
`

const Avatar = styled(UserAvatar)`
  align-self: center;
  margin-bottom: ${Units.scale[1]};
`

const Bio = styled(HTML)`
  margin-top: ${Units.scale[1]};
  margin-bottom: ${Units.scale[1]};
`

class ProfileHeader extends Component {
  render() {
    const { user, type, onToggle, isTheCurrentUser } = this.props

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
        <Avatar user={user} />

        <Name>{user.name}</Name>

        <Bio
          value={user.bio || '<p>—</p>'}
          stylesheet={{
            p: {
              textAlign: 'center',
              lineHeight: Typography.lineHeightFor('small'),
            },
          }}
        />

        <ProfileActions
          user={user}
          isTheCurrentUser={isTheCurrentUser}
        />

        <TabToggle
          selectedSegment={type}
          onToggleChange={onToggle}
          options={TAB_OPTIONS}
        />
      </Container>
    )
  }
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
