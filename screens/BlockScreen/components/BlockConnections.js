import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ActivityIndicator, FlatList } from 'react-native'

import ChannelItem from '../../../components/ChannelItem'
import { CenterColumn } from '../../../components/UI/Layout'
import { Button, ButtonLabel } from '../../../components/UI/Buttons'
import { Units } from '../../../constants/Style'
import Empty from '../../../components/Empty'

import NavigatorService from '../../../utilities/navigationService'


const Submit = styled(CenterColumn)`
  margin-vertical: ${Units.base};
`

const Connections = styled.View`
  padding-vertical: ${Units.scale[2]};
`

class BlockConnections extends React.Component {
  constructor(props) {
    super(props)
    this.renderLoader = this.renderLoader.bind(this)
  }

  navigateToConnect = () => {
    const { block } = this.props.data
    NavigatorService.navigate('connect', {
      connectable_id: block.id,
      connectable_type: 'BLOCK',
      title: block.title,
    })
  }

  renderLoader() {
    if (!this.props.data.loading) return null
    return (
      <Submit>
        <ActivityIndicator animating size="small" />
      </Submit>
    )
  }


  render() {
    const { data } = this.props
    const contents = data.block && data.block.channels
    const { error, loading } = data

    if (error) {
      return (
        <Submit>
          <Empty text="Error loading comments" />
        </Submit>
      )
    }

    if (loading) {
      return (
        <Submit>
          <ActivityIndicator />
        </Submit>
      )
    }

    const contentsLoading = data.networkStatus === 2 || data.networkStatus === 1
    const empty = (<Empty text="No connections yet" />)
    const addConnectionButton = (
      <Button space={1} onPress={this.navigateToConnect}>
        <ButtonLabel>Connect &rarr;</ButtonLabel>
      </Button>
    )

    if (contents.length === 0 && !contentsLoading) {
      return (
        <Connections>
          {empty}
          <Submit>
            {addConnectionButton}
          </Submit>
        </Connections>
      )
    }


    return (
      <Connections>
        <FlatList
          data={contents}
          refreshing={data.networkStatus === 4}
          keyExtractor={item => item.id}
          onRefresh={this.onRefresh}
          onEndReachedThreshold={0.9}
          ListFooterComponent={this.renderLoader}
          renderItem={({ item }) => (
            <ChannelItem channel={item} />
          )}
        />
        <Submit>
          {addConnectionButton}
        </Submit>
      </Connections>
    )
  }
}

BlockConnections.propTypes = {
  data: PropTypes.any.isRequired,
}

export const BlockConnectionsQuery = gql`
  query BlockQuery($id: ID!){
    block(id: $id) {
      __typename
      id
      channels {
        ...ChannelThumb
      }
    }
  }
  ${ChannelItem.fragments.channel}
`

const BlockConnectionsWithData = graphql(BlockConnectionsQuery)(BlockConnections)

export default BlockConnectionsWithData
