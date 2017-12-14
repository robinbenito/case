import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { Border, Units, Typography, Colors } from '../constants/Style'

const Tabs = styled.View`
  flex-direction: row;
  align-items: center;
`

const Tab = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-bottom-width: ${Border.borderWidthMedium};
  border-bottom-color: ${({ color, isSelected }) => (isSelected && (color || Colors.semantic.text)) || Border.borderColor};
  padding-vertical: ${Units.scale[3]};
  padding-horizontal: ${Units.scale[2]};
`

const TabLabel = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: ${Typography.fontSize.base};
  font-weight: ${({ isSelected }) => Typography.fontWeight[isSelected ? 'semiBold' : 'regular']};
  color: ${({ color }) => color || Colors.semantic.text};
`

const TabToggle = ({ options, selectedSegment, onToggleChange, color }) => (
  <Tabs>
    {
      Object.keys(options).map((label) => {
        const value = options[label]
        const isSelected = value === selectedSegment
        return (
          <Tab
            key={label}
            onPress={() => onToggleChange(value)}
            isSelected={isSelected}
            color={color}
          >
            <TabLabel isSelected={isSelected} color={color}>
              {label}
            </TabLabel>
          </Tab>
        )
      })
    }
  </Tabs>
)

TabToggle.propTypes = {
  color: PropTypes.string,
  options: PropTypes.any.isRequired,
  onToggleChange: PropTypes.func.isRequired,
  selectedSegment: PropTypes.string.isRequired,
}

TabToggle.defaultProps = {
  color: null,
}

export default TabToggle
