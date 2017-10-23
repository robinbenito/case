import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { View } from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Colors, Units, Typography } from '../constants/Style'

import NavigatorService from '../utilities/navigationService'

const Button = styled.TouchableOpacity`
  padding-horizontal: ${Units.scale[2]};
  background-color: white;
`

const ButtonText = styled.Text`
  font-size: ${Typography.fontSize.medium};
  line-height: ${Typography.lineHeightFor('medium')};
  color: ${Colors.gray.semiBold};
`

class BlockEditButton extends React.Component {
  onPress = () => {
    const { id } = this.props
    NavigatorService.navigate('editBlock', { id })
  }

  render() {
    const { data } = this.props

    if (data.loading || data.error) return <View />

    return data.block.can.manage ? (
      <Button onPress={this.onPress}>
        <ButtonText>Edit</ButtonText>
      </Button>
    ) : <View />
  }
}

BlockEditButton.propTypes = {
  id: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
}

export const CanEditQuery = gql`
  query BlockEditQuery($id: ID!) {
    block(id: $id) {
      id
      can {
        manage
      }
    }
  }
`

export default graphql(CanEditQuery)(BlockEditButton)
