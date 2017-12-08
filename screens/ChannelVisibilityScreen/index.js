import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import ChannelVisibilitySelect from './components/ChannelVisibilitySelect'
import HeaderAwareContainer from '../../components/UI/Layout/HeaderAwareContainer'

import withLoadingAndErrors from '../../hocs/withLoadingAndErrors'

class ChannelVisibilityScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          visibility: PropTypes.oneOf(['PUBLIC', 'CLOSED', 'PRIVATE']).isRequired,
          onVisibilityChangeUpdate: PropTypes.func.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    data: PropTypes.shape({
      me: PropTypes.object.isRequired,
    }).isRequired,
  }

  render() {
    const {
      data: { me },
      navigation: {
        state: {
          params: {
            visibility,
            onVisibilityChangeUpdate,
          },
        },
      },
    } = this.props

    return (
      <HeaderAwareContainer>
        <ChannelVisibilitySelect
          me={me}
          visibility={visibility}
          onVisibilityChangeUpdate={onVisibilityChangeUpdate}
        />
      </HeaderAwareContainer>
    )
  }
}

const DecoratedChannelVisibilityScreen = withLoadingAndErrors(ChannelVisibilityScreen)

const ChannelVisibilityScreenQuery = gql`
  query ChannelVisibilityScreenQuery {
    me {
      ...ChannelVisibilitySelectFragment
    }
  }

  ${ChannelVisibilitySelect.fragments.me}
`

export default graphql(ChannelVisibilityScreenQuery)(DecoratedChannelVisibilityScreen)
