import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { concat, reject } from 'lodash'
import styled from 'styled-components/native'
import { Keyboard } from 'react-native'

import navigationService from '../../utilities/navigationService'
import alertErrors from '../../utilities/alertErrors'

import SelectedChannels from './components/SelectedChannels'
import SearchHeader from '../../components/SearchHeader'
import { ChannelConnectionsQuery } from '../ChannelScreen/components/ChannelContainer'
import SearchConnectionsWithData from './components/SearchConnections'
import RecentConnectionsWithData, { RecentConnectionsQuery } from './components/RecentConnections'
import { BlockConnectionsQuery } from '../../screens/BlockScreen/components/BlockConnections'
import { BlockQuery } from '../../screens/BlockScreen/components/BlockContents'

import uploadImage from '../../api/uploadImage'

import { Units } from '../../constants/Style'
import { Container } from '../../components/UI/Layout'

const SelectContainer = styled(Container)`
  margin-top: 0;
  background-color: white;
`

const SelectedContainer = styled.View`
  flex: 1;
  margin-top: ${Units.scale[5]};
`

class SelectConnectionScreen extends React.Component {
  static navigationOptions() {
    return {
      header: null,
    }
  }

  constructor(props) {
    super(props)

    const {
      image,
      content,
      description,
      title,
      source_url,
      onCancel,
      connectable_id,
      connectable_type,
    } = props.navigation.state.params

    this.state = {
      isSearching: false,
      q: null,
      selectedConnections: [],
      search: null,
      image,
      content,
      description,
      title,
      source_url,
      connectable_id,
      connectable_type,
    }

    this.onToggleConnection = this.onToggleConnection.bind(this)
    this.saveConnections = this.saveConnections.bind(this)

    this.onCancel = onCancel
  }

  onToggleConnection(connection, isSelected) {
    const connections = this.state.selectedConnections
    let newConnections

    if (isSelected) {
      newConnections = concat(connections, connection)
    } else {
      newConnections = reject(connections, existingConnection =>
        connection.id === existingConnection.id,
      )
    }

    this.setState({
      selectedConnections: newConnections,
    })
  }

  getRefetchQueries() {
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

  navigateToBlock(id, imageLocation) {
    this.setState({ selectedConnections: [] })
    navigationService.reset('block', { id, imageLocation })
  }


  maybeUploadImage() {
    const { image } = this.state
    if (!image) return Promise.resolve()
    return uploadImage(image)
  }

  saveConnections() {
    const {
      title,
      content,
      description,
      source_url,
      connectable_id: connectableId,
      connectable_type: connectableType,
    } = this.state
    const { createBlock, createConnection } = this.props
    const channelIds = this.state.selectedConnections.map(channel => channel.id)
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

    return this.maybeUploadImage()
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

        createBlock({ variables, refetchQueries }).then((response) => {
          Keyboard.dismiss()
          const { data: { create_block: { block } } } = response
          this.navigateToBlock(block.id, image && image.location)
        })
      }).catch(alertErrors)
  }

  search = (text) => {
    this.setState({
      isSearching: text.length > 0,
      search: text,
    })
  }

  render() {
    const { search, selectedConnections, isSearching, title, source_url: sourceURL } = this.state

    const ConnectionContent = isSearching ? (
      <SearchConnectionsWithData
        q={search}
        key={`search-${selectedConnections.length}`}
        selected={selectedConnections}
        onToggleConnection={this.onToggleConnection}
      />
    ) : (
      <RecentConnectionsWithData
        selected={selectedConnections}
        key={`recent-${selectedConnections.length}`}
        onToggleConnection={this.onToggleConnection}
      />
    )

    const cancelOrDone = selectedConnections.length > 0 ? 'Done' : 'Cancel'

    return (
      <SelectContainer>
        <SearchHeader
          onChangeText={this.search}
          cancelOrDone={cancelOrDone}
          onSubmit={this.saveConnections}
          onCancel={this.onCancel}
        />
        <SelectedContainer>
          <SelectedChannels
            isSearching={isSearching}
            onRemove={channel => this.onToggleConnection(channel, false)}
            channels={selectedConnections}
            title={title || sourceURL || 'Untitled block'}
            key={`selected-${selectedConnections.length}`}
          />
          {ConnectionContent}
        </SelectedContainer>
      </SelectContainer>
    )
  }
}

SelectConnectionScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  createBlock: PropTypes.any.isRequired,
  createConnection: PropTypes.any.isRequired,
}

SelectConnectionScreen.defaultProps = {
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

const SelectConnectionScreenWithData = compose(
  graphql(connectMutation, { name: 'createConnection' }),
  graphql(createMutation, { name: 'createBlock' }),
)(SelectConnectionScreen)

export default SelectConnectionScreenWithData
