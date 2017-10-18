import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import styled from 'styled-components/native'
import { Colors, Typography, Units } from '../constants/Style'

const HitArea = styled.TouchableOpacity`
  width: ${x => x.size};
`

const Name = styled.Text.attrs({
  numberOfLines: 2,
})`
  margin-vertical: ${Units.scale[1]};
  text-align: center;
  font-size: ${Typography.fontSize.small};
  line-height: ${Typography.lineHeightFor('small')};
`

const Initials = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: ${x => x.size / 3};
  color: ${Colors.semantic.text};
  background-color: transparent;
`

const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: ${x => x.size / 2};
`

const Avatar = styled.View`
  width: ${x => x.size};
  height: ${x => x.size};
  border-radius: ${x => x.size};
  background-color: ${Colors.semantic.background};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default class UserAvatar extends React.Component {
  render() {
    const { user, size, onPress, includeName, ...rest } = this.props

    return (
      <HitArea size={size} onPress={onPress} {...rest}>
        <Avatar size={size}>
          <Initials size={size}>
            {user.initials}
          </Initials>

          <AvatarImage
            size={size}
            source={{ uri: decodeURIComponent(user.avatar) }}
          />
        </Avatar>

        {includeName &&
          <Name>
            {user.name}
          </Name>
        }
      </HitArea>
    )
  }
}

UserAvatar.fragments = {
  avatar: gql`
    fragment Avatar on User {
      id
      name
      slug
      initials
      avatar(size: LARGE)
    }
  `,
}

UserAvatar.propTypes = {
  size: PropTypes.number,
  onPress: PropTypes.func,
  includeName: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
    initials: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
}

UserAvatar.defaultProps = {
  size: 60,
  includeName: false,
  onPress: () => null,
}
