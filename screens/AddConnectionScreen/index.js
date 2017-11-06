import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql, compose } from 'react-apollo'
import { Keyboard } from 'react-native'
import styled from 'styled-components/native'

import navigationService from '../../utilities/navigationService'
import alertErrors from '../../utilities/alertErrors'

import SelectedChannels from './components/SelectedChannels'
import StatusMessage from './components/StatusMessage'
import SearchHeader from '../../components/SearchHeader'
import { ChannelConnectionsQuery } from '../ChannelScreen/components/ChannelContainer'
import SearchConnectionsWithData from './components/SearchConnections'
import RecentConnectionsWithData, { RecentConnectionsQuery } from './components/RecentConnections'
import { StatusBarAwareContainer } from '../../components/UI/Layout'

import { BlockConnectionsQuery } from '../../screens/BlockScreen/components/BlockConnections'
import { BlockQuery } from '../../screens/BlockScreen/components/BlockContents'

import uploadImage from '../../api/uploadImage'

import { Units } from '../../constants/Style'

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
    } = props.navigation.state.params

    this.state = {
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

  // TODO: isSelected prop is unessaray to toggle
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

  navigateToBlock = (id, imageLocation) => {
    this.setState({ selectedConnections: {} }) // TODO: Why?
    navigationService.reset('block', { id, imageLocation })
  }

  maybeUploadImage = () => {
    const { image } = this.state
    if (!image) return Promise.resolve()
    return uploadImage(image)
  }

  saveConnections = () => {
    const {
      title,
      content,
      description,
      source_url,
      connectable_id: connectableId,
      connectable_type: connectableType,
    } = this.state
    const { createBlock, createConnection } = this.props
    const channelIds = Object.keys(this.state.selectedConnections)
    const refetchQueries = this.getRefetchQueries()

    if (connectableId) {
      return createConnection({
        variables: {
          connectable_type: connectableType,
          connectable_id: connectableId,
          channel_ids: channelIds,
        },
        refetchQueries,
      })

      .then(() => {
        Keyboard.dismiss()
        navigationService.back()
      })

      .catch(alertErrors)
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

      .then(([{ data: { create_block: { block } } }, image]) => {
        Keyboard.dismiss()
        this.navigateToBlock(block.id, image && image.location)
      })

      .catch(alertErrors)
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
        <SearchHeader
          onChangeText={this.search}
          cancelOrDone={cancelOrDone}
          onSubmit={this.saveConnections}
          onCancel={this.onCancel}
          autoFocus
        />

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

const createMutation = gql`
  mutation createBlockMutation($channel_ids: [ID]!, $title: String, $content: String, $description: String, $source_url: String){
    create_block(input: { channel_ids: $channel_ids, title: $title, content: $content, description: $description, source_url: $source_url }) {
      clientMutationId
      block {
        id
        title
      }
    }
  }
`

const connectMutation = gql`
  mutation createConnectionMutation($channel_ids: [ID]!, $connectable_id: ID!, $connectable_type: BaseConnectableTypeEnum!){
    create_connection(input: { channel_ids: $channel_ids, connectable_type: $connectable_type, connectable_id: $connectable_id }) {
      connectable {
        id
        title
      }
    }
  }
`

const AddConnectionsScreenWithData = compose(
  graphql(connectMutation, { name: 'createConnection' }),
  graphql(createMutation, { name: 'createBlock' }),
)(AddConnectionsScreen)

export default AddConnectionsScreenWithData
