import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { View } from 'react-native'

import { Border, Units } from '../../constants/Style'

import navigationService from '../../utilities/navigationService'

import { HeaderButton, HeaderButtonLabel, Caret } from './HeaderButton'
import ToggleCheck from './ToggleCheck'
import { ToggleSelect, ToggleSelectOption } from './ToggleSelect'
import { HorizontalRule } from '../UI/Layout'

const optionPress = (props, option) => {
  props.onPress()

  if (option.onPress) return option.onPress()

  return navigationService.reset(option.key)
}

const HeaderDrawer = styled.View`
  position: absolute;
  top: ${Units.statusBarHeight};
  width: 100%;
`

export default class HeaderPullDown extends Component {
  constructor(props) {
    super(props)

    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    this.props.onPress()
  }

  render() {
    return (
      <HeaderDrawer>
        {!this.props.isExpanded &&
          <HeaderButton onPress={this.onPress}>
            <HeaderButtonLabel active>
              {this.props.title || this.props.primary.title}
              <Caret />
            </HeaderButtonLabel>
          </HeaderButton>
        }

        {this.props.isExpanded &&
          <ToggleSelect>
            <ToggleSelectOption>
              <HeaderButtonLabel active>
                {this.props.primary.title || '—'}
              </HeaderButtonLabel>
              <ToggleCheck />
            </ToggleSelectOption>

            {this.props.secondary.map(option => (
              <View key={option.key}>
                <HorizontalRule color={Border.borderColor} />
                <ToggleSelectOption
                  onPress={() => optionPress(this.props, option)}
                >
                  <HeaderButtonLabel>
                    {option.title}
                  </HeaderButtonLabel>
                </ToggleSelectOption>
              </View>
            ))}
          </ToggleSelect>
        }
      </HeaderDrawer>
    )
  }
}

HeaderPullDown.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  isExpanded: PropTypes.bool,
  primary: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  secondary: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  })).isRequired,
}

HeaderPullDown.defaultProps = {
  title: null,
  onPress: (() => {}),
  isExpanded: false,
}
