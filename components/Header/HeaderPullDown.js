import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { decode } from 'he'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import HeaderPullDownDrawer from './HeaderPullDownDrawer'
import { HeaderButton, HeaderButtonLabel, Caret } from './HeaderButton'
import { openModal } from '../Modal'

class HeaderPullDown extends Component {
  static propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    isHeaderTitleVisible: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    title: '',
    color: null,
  }

  onPress = () => {
    const { title } = this.props

    openModal({
      children: <HeaderPullDownDrawer title={title} />,
    })
  }

  render() {
    const { title, color, isHeaderTitleVisible } = this.props

    return (
      <HeaderButton onPress={this.onPress}>
        {isHeaderTitleVisible && !isEmpty(title) &&
          <HeaderButtonLabel color={color}>
            {decode(title)}
          </HeaderButtonLabel>
        }

        <Caret color={color} isWithLabel={isHeaderTitleVisible && !isEmpty(title)} />
      </HeaderButton>
    )
  }
}

export default connect(({ ui: { isHeaderTitleVisible } }) =>
  ({ isHeaderTitleVisible }))(HeaderPullDown)
