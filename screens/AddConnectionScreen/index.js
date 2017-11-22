import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { Keyboard, View } from 'react-native'
import styled from 'styled-components/native'

import navigationService from '../../utilities/navigationService'
import alertErrors from '../../utilities/alertErrors'
import params from '../../utilities/params'

import SelectedChannels from './components/SelectedChannels'
import StatusMessage from './components/StatusMessage'
import SearchHeader from '../../components/SearchHeader'
import { ChannelConnectionsQuery } from '../ChannelScreen/components/ChannelContainer'
import SearchConnectionsWithData from './components/SearchConnections'
import RecentConnectionsWithData, { RecentConnectionsQuery } from './components/RecentConnections'
import { StatusBarAwareContainer } from '../../components/UI/Layout'
import SimulatedProgressHeader from '../../components/SimulatedProgressHeader'

import createConnectionMutation from './mutations/createConnection'
import createBlockMutation from './mutations/createBlock'

import { BlockConnectionsQuery } from '../../screens/BlockScreen/components/BlockConnections'
import { BlockQuery } from '../../screens/BlockScreen/components/BlockContents'

import uploadImage from '../../api/uploadImage'

import { Colors, Units } from '../../constants/Style'

const ConnectionSelection = styled.View`
  margin-vertical: ${Units.scale[3]};
  margin-horizontal: ${Units.scale[3]};
`

const ConnectionStatusMessage = styled(StatusMessage)`
  margin-bottom: ${Units.scale[1]};
`

class AddConnectionsScreen extends Component {
  constructor(props) {
    super(props)

    const {
      onCancel,
      // TODO: Accept a param `block` instead
      image,
      content,
      description,
      title,
      source_url,
      connectable_id,
      connectable_type,
    } = params(props.navigation)

    this.state = {
      isConnecting: false,
      isSearching: false,
      q: null,
      selectedConnections: {},
      search: null, // If `q` is the query why is this also query?
      // TODO: Set a state `block` instead
      image,
      content,
      description,
      title,
      source_url,
      connectable_id,
      connectable_type,
    }

    this.onCancel = onCancel
  }

  // TODO: isSelected prop is unnecessary to toggle
  onToggleConnection = (connection, isSelected) => {
    const { selectedConnections } = this.state

    let _selectedConnections = {}

    if (isSelected) { // Adds to state
      _selectedConnections = {
        [`${connection.id}`]: connection,
        ...selectedConnections,
      }
    } else { // Removes from state
      const {
        [`${connection.id}`]: deleted,
        ...remainingConnections
      } = selectedConnections

      _selectedConnections = {
        ...remainingConnections,
      }
    }

    this.setState({
      selectedConnections: _selectedConnections,
    })
  }

  getRefetchQueries = () => {
    const {
      connectable_id: connectableId,
      connectable_type: connectableType,
    } = this.state

    let refetchQueries = [{ query: RecentConnectionsQuery }]

    if (connectableType === 'BLOCK') {
      refetchQueries = [...refetchQueries,
        {
          query: BlockConnectionsQuery,
          variables: { id: connectableId },
        },
        {
          query: BlockQuery,
          variables: { id: connectableId },
        },
      ]
    } else if (connectableType === 'CHANNEL') {
      refetchQueries = [...refetchQueries,
        {
          query: ChannelConnectionsQuery,
          variables: { id: connectableId },
        },
      ]
    }

    return refetchQueries
  }

  maybeUploadImage = () => {
    const { image } = this.state
    if (!image) return Promise.resolve()
    return uploadImage(image)
  }

  connectConnectableTo = (channelIds) => {
    this.setState({ isConnecting: true })

    const {
      title,
      content,
      description,
      source_url,
      connectable_id,
      connectable_type,
    } = this.state

    const {
      createBlock,
      createConnection,
    } = this.props

    const refetchQueries = this.getRefetchQueries()

    if (connectable_id) {
      return createConnection({
        variables: {
          connectable_type,
          connectable_id,
          channel_ids: channelIds,
        },
        refetchQueries,
      })

      .then(() => {
        Keyboard.dismiss()
        navigationService.back()
      })

      .catch((err) => {
        this.setState({ isConnecting: false })
        alertErrors(err)
      })
    }

    return this
      .maybeUploadImage()

      .then((image) => {
        let variables = { channel_ids: channelIds, title, description }

        if (image) {
          // This is an image
          variables = { ...variables, source_url: image.location }
        } else if (content) {
          // This is a piece of text
          variables = { ...variables, content }
        } else {
          // This is some kind of link
          variables = { ...variables, source_url }
        }

        return Promise.all([
          createBlock({ variables, refetchQueries }),
          Promise.resolve(image),
        ])
      })

      .then(([{ data: { create_block: { block, channels } } }, image]) => {
        Keyboard.dismiss()

        if (channels.length === 1) {
          const channel = channels[0]

          return navigationService.reset('channel', {
            id: channel.id,
            title: channel.title,
            color: Colors.channel[channel.visibility],
          })
        }

        navigationService.reset('block', {
          id: block.id,
          imageLocation: image && image.location,
        })
      })

      .catch((err) => {
        this.setState({ isConnecting: false })
        alertErrors(err)
      })
  }

  saveSelectedConnections = () => {
    const channelIds = Object.keys(this.state.selectedConnections)
    this.connectConnectableTo(channelIds)
  }

  search = query =>
    this.setState({
      isSearching: query.length > 0,
      search: query,
    })

  render() {
    const {
      search,
      selectedConnections,
      isSearching,
      isConnecting,
      title,
      source_url: sourceURL,
    } = this.state

    const nSelectedConnections = Object.keys(selectedConnections).length
    const hasSelectedConnections = nSelectedConnections > 0

    const cancelOrDone = hasSelectedConnections
      ? 'Connect'
      : 'Cancel'

    return (
      <StatusBarAwareContainer>
        {isConnecting &&
          <SimulatedProgressHeader>
            Connecting...
          </SimulatedProgressHeader>
        }

        {!isConnecting &&
          <SearchHeader
            onChangeText={this.search}
            cancelOrDone={cancelOrDone}
            onSubmit={this.saveSelectedConnections}
            onCancel={this.onCancel}
            autoFocus
          />
        }

        <ConnectionSelection>
          <ConnectionStatusMessage
            title={title || sourceURL || 'Untitled block'}
            isActive={hasSelectedConnections || isSearching}
          />

          {/* Existence of `key` props below force re-renders */}
          <SelectedChannels
            key={`selectedChannels-${nSelectedConnections}`}
            onRemove={channel => this.onToggleConnection(channel, false)}
            selectedConnections={selectedConnections}
          />

        </ConnectionSelection>

        {isSearching ?
          <SearchConnectionsWithData
            key={`searchConnectionsWithData-${nSelectedConnections}`}
            q={search}
            selectedConnections={selectedConnections}
            onToggleConnection={this.onToggleConnection}
          />
        :
          <RecentConnectionsWithData
            key={`recentConnectionsWithData-${nSelectedConnections}`}
            selectedConnections={selectedConnections}
            onToggleConnection={this.onToggleConnection}
          />
        }
      </StatusBarAwareContainer>
    )
  }
}

AddConnectionsScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  createBlock: PropTypes.any.isRequired,
  createConnection: PropTypes.any.isRequired,
}

AddConnectionsScreen.defaultProps = {
  q: '',
  searchData: {},
}

const AddConnectionsScreenWithData = compose(
  graphql(createConnectionMutation, { name: 'createConnection' }),
  graphql(createBlockMutation, { name: 'createBlock' }),
)(AddConnectionsScreen)

export default AddConnectionsScreenWithData
