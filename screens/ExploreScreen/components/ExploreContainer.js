import React from 'react'
import { graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'

import ChannelItem from '../../../components/ChannelItem'
import BlockItem from '../../../components/BlockItem'
import FlatListFooter from '../../../components/UI/Layout/FlatListFooter'

import withErrors from '../../../hocs/withErrors'

import scrollSensorForHeader from '../../../utilities/scrollSensorForHeader'
import networkStatusService from '../../../utilities/networkStatusService'
import alertErrors from '../../../utilities/alertErrors'

import { Units } from '../../../constants/Style'

import exploreQuery from '../queries/explore'

const StyledChannelItem = styled(ChannelItem)`
  margin-horizontal: ${Units.base};
`

const TYPE_CONFIG = {
  CHANNEL: {
    columnWrapperStyle: false,
    numColumns: 1,
  },

  CONNECTABLE: {
    columnWrapperStyle: { justifyContent: 'space-around' },
    numColumns: 2,
  },
}

class ExploreContainer extends React.Component {
  static propTypes = {
    data: PropTypes.any.isRequired,
    header: PropTypes.node.isRequired,
    // TODO: This is incorrect: CONNECTABLE should be BLOCK
    type: PropTypes.oneOf(['CHANNEL', 'CONNECTABLE']).isRequired,
    loadPage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
  }

  static defaultProps = {
    page: 1,
    type: 'CHANNEL',
  }

  constructor(props) {
    super(props)

    this.state = {
      page: props.page,
      endReached: false,
    }
  }

  componentDidMount() {
    scrollSensorForHeader.dispatch(true)
  }

  componentWillReceiveProps(nextProps) {
    // Resets the page state when type updates
    if (nextProps.page !== this.state.page && nextProps.type !== this.props.type) {
      this.setState({ page: nextProps.page, endReached: false })
    }
  }

  onEndReached = () => {
    const { data: { loading }, loadPage } = this.props

    if (loading) return
    if (this.state.endReached) return

    const nextPage = this.state.page + 1
    this.setState({ page: nextPage })

    return loadPage(nextPage)
      .then((res) => {
        const { data: { contents } } = res

        if (contents.length === 0) {
          this.setState({ endReached: true })
        }

        return res
      })
      .catch(alertErrors)
  }

  onRefresh = () => {
    this.setState({ page: 1 })
    this.props.data.refetch()
  }

  onScroll = scrollSensorForHeader

  keyExtractor = ({ klass, id }, index) =>
    `${klass}-${id}-${index}`

  renderItem = ({ item }) => {
    if (item.klass === 'Block') {
      return <BlockItem block={item} size="2-up" />
    }

    return <StyledChannelItem channel={item} />
  }

  render() {
    const { data, header, type } = this.props

    const contents = data.contents || []
    const networkStatus = networkStatusService(data.networkStatus)

    const { numColumns, columnWrapperStyle } = TYPE_CONFIG[type]

    return (
      <FlatList
        key={type}
        data={contents}
        columnWrapperStyle={columnWrapperStyle}
        refreshing={networkStatus.is.refreshing}
        onRefresh={this.onRefresh}
        numColumns={numColumns}
        keyExtractor={this.keyExtractor}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.9}
        scrollEventThrottle={50}
        onScroll={this.onScroll}
        ListHeaderComponent={header}
        ListFooterComponent={<FlatListFooter loading={data.loading} />}
        renderItem={this.renderItem}
      />
    )
  }
}

const DecoratedExploreContainer = withErrors(ExploreContainer, {
  errorMessage: 'Error getting explore',
})

const props = ({ data, data: { fetchMore } }) => ({
  data,
  loadPage(page) {
    return fetchMore({
      variables: { page },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const { contents: newContents } = fetchMoreResult
        const { contents: previousContents } = previousResult

        if (!newContents.length) return previousResult

        return {
          contents: [
            ...previousContents,
            ...newContents,
          ],
        }
      },
    })
  },
})

export default compose(
  graphql(exploreQuery, {
    props,
    skip: ({ type }) => type !== 'CONNECTABLE',
    options: {
      fetchPolicy: 'cache-and-network',
    },
  }),

  graphql(exploreQuery, {
    props,
    skip: ({ type }) => type !== 'CHANNEL',
    options: {
      fetchPolicy: 'cache-and-network',
    },
  }),
)(DecoratedExploreContainer)
