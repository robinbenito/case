import React from 'react'
import PropTypes from 'prop-types'
import Client from '../../state/Apollo'

import { BlockQuery } from '../BlockScreen/components/BlockContents'

import EditBlockForm from './components/EditBlockForm'
import BackButton from '../../components/BackButton'

const navigationOptions = {
  title: 'Edit Block',
  headerLeft: (<BackButton />),
}

class EditBlockScreen extends React.Component {
  static navigationOptions() {
    return navigationOptions
  }

  constructor(props) {
    super(props)

    // Get block from cache
    const { id } = this.props.navigation.state.params
    const { block } = Client.readQuery({ query: BlockQuery, variables: { id } })

    this.state = {
      block,
    }
  }

  render() {
    const { navigation } = this.props
    const { block } = this.state
    return (
      <EditBlockForm
        navigation={navigation}
        block={block}
      />
    )
  }
}

EditBlockScreen.propTypes = {
  navigation: PropTypes.any,
}

EditBlockScreen.defaultProps = {
  navigation: () => null,
}

export default EditBlockScreen
