import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'

import ChannelVisibilitySelect from './components/ChannelVisibilitySelect'
import { Container } from '../../components/UI/Layout'

import withLoadingAndErrors from '../../hocs/withLoadingAndErrors'

class ChannelVisibilityScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
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
      <Container>
        <ChannelVisibilitySelect
          me={me}
          visibility={visibility}
          onVisibilityChangeUpdate={onVisibilityChangeUpdate}
        />
      </Container>
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
