import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'

import ChannelForm from './ChannelForm'
import withLoadingAndErrors from '../../WithLoadingAndErrors'

class ChannelFormContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  render() {
    const { data: { channel }, ...rest } = this.props
    return <ChannelForm channel={channel} {...rest} />
  }
}

ChannelFormContainer.propTypes = {
  id: PropTypes.number.isRequired,
}

const ChannelFormQuery = gql`
  query ChannelFormQuery($id: ID!) {
    channel(id: $id) {
      ...ChannelForm
    }
  }
  ${ChannelForm.fragments.channelForm}
`

const DecoratedChannelForm = withLoadingAndErrors(ChannelFormContainer)

export default graphql(ChannelFormQuery)(DecoratedChannelForm)
