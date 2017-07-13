import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql, withApollo } from 'react-apollo'

import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native'

import ContentsToggle from './ContentsToggle'
import ContentsList from './ContentsList'

import layout from '../../constants/Layout'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleContainer: {
    paddingLeft: layout.padding,
    paddingRight: layout.padding,
    paddingBottom: layout.padding,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.padding,
    minHeight: 200,
  },
})

class ContentsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: null,
      page: 1,
    }
  }

  shouldComponentUpdate(newProps) {
    if (newProps.data && newProps.data.loading) { return false }
    return true
  }

  onToggleChange(value) {
    const typeValue = {
      Blocks: 'block',
      Channels: 'channel',
    }[value]

    this.setState({ type: typeValue, page: 2 })
    this.props.data.refetch({ type: typeValue })
  }

  onEndReached() {
    const currentPage = this.state.page
    this.setState({ page: currentPage + 1 })
    if (currentPage < 4) {
      this.props.loadMore(this.state.page)
    }
  }

  render() {
    if (this.props.data.error) {
      return (
        <View style={styles.loadingContainer} >
          <Text>
            Profile not found
          </Text>
        </View>
      )
    }

    if (this.props.data.loading) {
      return (
        <View style={styles.loadingContainer} >
          <ActivityIndicator />
        </View>
      )
    }

    const type = this.state.type || this.props.type

    const segmentValue = {
      block: 'Blocks',
      channel: 'Channels',
    }[type]

    return (
      <View style={styles.container}>
        <View style={styles.toggleContainer}>
          <ContentsToggle
            selectedSegment={segmentValue}
            onToggleChange={() => this.onToggleChange()}
          />
        </View>
        <ContentsList
          contents={this.props.data.search}
          type={segmentValue}
          per={10}
        />
      </View>
    )
  }
}

const ContentsQuery = gql`
  query ContentsQuery($type: String!, $objectId: String, $objectType: ObjectType, $page: Int){
    search(object_id: $objectId, object_type: $objectType, per: 10, page: $page type: $type) {
      id
      title
      updated_at(relative: true)
      user {
        name
      }
      klass
      kind {
        type: __typename
        ... on Text {
          content
        }
        ... on Image {
          image_url(size: DISPLAY)
        }
        ... on Link {
          image_url(size: DISPLAY)
        }
        ... on Channel {
          visibility
        }
      }
    }
  }
`

ContentsContainer.propTypes = {
  data: PropTypes.any.isRequired,
  loadMore: PropTypes.func.isRequired,
  type: PropTypes.string,
}

ContentsContainer.defaultProps = {
  type: 'channel',
  page: 1,
}

const ContentsWithData = graphql(ContentsQuery, {
  options: ({ objectId, objectType, type, page }) => ({
    variables: { objectId, objectType, type, page },
  }),
  props: (props) => {
    const data = props.data
    return {
      data,
      loadMore(page) {
        return props.data.fetchMore({
          variables: {
            page,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult.data) { return previousResult }
            return Object.assign({}, previousResult, {
              search: [...previousResult.search, ...fetchMoreResult.data.search],
            })
          },
        })
      },
    }
  },
})(ContentsContainer)

const ContentsWithDataWithApollo = withApollo(ContentsWithData)

export default ContentsWithDataWithApollo
