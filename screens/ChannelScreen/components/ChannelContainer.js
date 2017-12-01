import React from 'react'
import { graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types'

import ChannelHeader from './ChannelHeader'
import ChannelContents from './ChannelContents'

import withLoadingAndErrors from '../../../hocs/withLoadingAndErrors'

// TODO:
// import Store from '../../../state/Store'
// import { SET_CURRENT_ABILITY } from '../../../state/actions'

import channelQuery from '../queries/channel'

class ChannelContainer extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['CHANNEL', 'BLOCK', 'CONNECTION']).isRequired,
    page: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
  }

  static defaultProps = {
    page: 1,
  }

  constructor(props) {
    super(props)

    this.state = {
      page: props.page,
      type: props.type,
    }
  }

  onToggleChange = (type) => {
    this.setState({ page: 1, type })
  }

  render() {
    const { data: { channel } } = this.props
    const { type, page } = this.state

    const Header = (
      <ChannelHeader
        type={type}
        channel={channel}
        onToggle={this.onToggleChange}
      />
    )

    return (
      <ChannelContents
        id={channel.id}
        channel={channel}
        type={type}
        page={page}
        header={Header}
      />
    )
  }
}

const DecoratedChannelContainer = withLoadingAndErrors(ChannelContainer, {
  errorMessage: 'Error getting this channel',
})

const ChannelContainerWithData = compose(
  graphql(channelQuery, {
    options: {
      fetchPolicy: 'cache-and-network',
    },
  }),
)(DecoratedChannelContainer)

export default ChannelContainerWithData
