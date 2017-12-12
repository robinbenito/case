import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { View } from 'react-native'
import { decode } from 'he'
import { reject } from 'lodash'

import navigationService from '../../utilities/navigationService'

import { HeaderButton, HeaderButtonLabel, Caret } from './HeaderButton'
import ToggleCheck from './ToggleCheck'
import { ToggleSelect, ToggleSelectOption } from './ToggleSelect'
import { HorizontalRule } from '../UI/Layout'

import { Units } from '../../constants/Style'

const LINKS = [
  { title: 'Your profile', key: 'me' },
  { title: 'Feed', key: 'feed' },
  { title: 'Explore', key: 'explore' },
]

const HeaderDrawer = styled.View`
  position: absolute;
  top: ${Units.statusBarHeight};
  width: 100%;
`

const SelectDrawer = styled.View`
  margin-horizontal: ${Units.base};
`

export default class HeaderPullDown extends Component {
  static propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool,
    isHeaderTitleVisible: PropTypes.bool,
  }

  static defaultProps = {
    title: '',
    color: null,
    isExpanded: false,
    isHeaderTitleVisible: true,
  }

  linksWithoutCurrentLink = () =>
    reject(LINKS, { key: navigationService.getCurrentRouteName() })

  render() {
    const {
      title,
      color,
      onPress,
      isExpanded,
      isHeaderTitleVisible,
    } = this.props

    return (
      <HeaderDrawer>
        {!isExpanded &&
          <HeaderButton onPress={onPress}>
            <HeaderButtonLabel color={color}>
              {isHeaderTitleVisible && title && decode(title)}
              <Caret color={color} />
            </HeaderButtonLabel>
          </HeaderButton>
        }

        {isExpanded &&
          <SelectDrawer>
            <ToggleSelect>
              <ToggleSelectOption>
                <HeaderButtonLabel active>
                  {decode(title || '—')}
                </HeaderButtonLabel>

                <ToggleCheck />
              </ToggleSelectOption>

              {this.linksWithoutCurrentLink().map(option => (
                <View key={option.key}>
                  <HorizontalRule />

                  <ToggleSelectOption
                    onPress={() => {
                      onPress()
                      return navigationService.reset(option.key)
                    }}
                  >
                    <HeaderButtonLabel>
                      {option.title && decode(option.title)}
                    </HeaderButtonLabel>
                  </ToggleSelectOption>
                </View>
              ))}
            </ToggleSelect>
          </SelectDrawer>
        }
      </HeaderDrawer>
    )
  }
}
