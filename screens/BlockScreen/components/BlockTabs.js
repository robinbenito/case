import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import TabToggle from '../../../components/TabToggle'
import BlockConnections from './BlockConnections'
import BlockComments from './BlockComments'

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
  },
})

const tabOptions = {
  Connections: 'connections',
  Comments: 'comments',
}

export default class BlockTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSegment: props.selectedSegment,
    }
    this.onToggleChange = this.onToggleChange.bind(this)
  }

  onToggleChange(value) {
    const selectedSegment = tabOptions[value]
    this.setState({
      selectedSegment,
    })
  }

  render() {
    const { block } = this.props
    const { selectedSegment } = this.state
    const content = selectedSegment === 'connections' ? (
      <BlockConnections id={block.id} />
    ) : (
      <BlockComments id={block.id} />
    )

    return (
      <View style={styles.tabContainer}>
        <TabToggle
          options={tabOptions}
          onToggleChange={this.onToggleChange}
          selectedSegment={this.state.selectedSegment}
        />
        {content}
      </View>
    )
  }
}

BlockTabs.propTypes = {
  block: PropTypes.any,
  selectedSegment: PropTypes.string,
}

BlockTabs.defaultProps = {
  block: {},
  selectedSegment: 'connections',
}
