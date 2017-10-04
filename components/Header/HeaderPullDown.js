import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { View } from 'react-native'
import { decode } from 'he'
import navigationService from '../../utilities/navigationService'
import { HeaderButton, HeaderButtonLabel, Caret } from './HeaderButton'
import ToggleCheck from './ToggleCheck'
import { ToggleSelect, ToggleSelectOption } from './ToggleSelect'
import { HorizontalRule } from '../UI/Layout'
import { Units } from '../../constants/Style'

const HeaderDrawer = styled.View`
  position: absolute;
  top: ${Units.statusBarHeight};
  width: 100%;
`

const HeaderPullDown = (props) => {
  const {
    primary,
    secondary,
    onPress,
    isExpanded,
    isHeaderTitleVisible,
  } = props

  return (
    <HeaderDrawer>
      {!isExpanded &&
        <HeaderButton onPress={onPress}>
          <HeaderButtonLabel style={{ color: primary.color }} active>
            {isHeaderTitleVisible && primary.title && decode(primary.title)}
            <Caret style={{ color: primary.color }} />
          </HeaderButtonLabel>
        </HeaderButton>
      }

      {isExpanded &&
        <ToggleSelect>
          <ToggleSelectOption>
            <HeaderButtonLabel active>
              {(primary.title && decode(primary.title)) || '—'}
            </HeaderButtonLabel>
            <ToggleCheck />
          </ToggleSelectOption>

          {secondary.map(option => (
            <View key={option.key}>
              <HorizontalRule />
              <ToggleSelectOption
                onPress={() => {
                  onPress()
                  if (option.onPress) return option.onPress()
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
      }
    </HeaderDrawer>
  )
}

HeaderPullDown.propTypes = {
  onPress: PropTypes.func,
  isExpanded: PropTypes.bool,
  primary: PropTypes.shape({
    title: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  secondary: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    onPress: PropTypes.func,
  })).isRequired,
  isHeaderTitleVisible: PropTypes.bool,
}

HeaderPullDown.defaultProps = {
  onPress: (() => {}),
  isExpanded: false,
  isHeaderTitleVisible: true,
}

export default HeaderPullDown
