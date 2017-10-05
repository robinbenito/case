import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components/native'
import { Colors, Border, Units, Typography } from '../constants/Style'
import { Input } from '../components/UI/Inputs'

import navigationService from '../utilities/navigationService'

export const SEARCH_BAR_HEIGHT = 28

const SearchInput = styled(Input)`
  flex: 4;
  border-radius: ${Border.borderRadius};
  background-color: ${Colors.semantic.background};
  height: ${SEARCH_BAR_HEIGHT};
  padding-horizontal: ${Units.scale[1]};
  padding-vertical: ${Units.scale[1]};
  font-size: ${Typography.fontSize.base};
`

const Button = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
  padding-horizontal: ${Units.scale[1]};
`

const ButtonText = styled.Text`
  font-size: ${Typography.fontSize.medium};
  color: ${Colors.gray.semiBold};
  text-align: left;
`

const Container = styled.View`
  position: absolute;
  top: ${SEARCH_BAR_HEIGHT};
  width: 100%;
  flex-direction: row;
  padding-horizontal: ${Units.scale[2]};
  align-items: center;
`

export default class SearchHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSearching: false,
      search: '',
      isSubmitting: false,
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    this.setState({ isSubmitting: true })
    this.props.onSubmit()
  }

  onChangeText = (text) => {
    this.setState({
      isSearching: text.length,
      search: text,
    })
    this.props.onChangeText(text)
  }

  render() {
    const { cancelOrDone, onCancel } = this.props
    const { search, isSubmitting } = this.state
    const buttonFunc = cancelOrDone === 'Cancel' ? onCancel : this.onSubmit

    return (
      <Container>
        <SearchInput
          onChangeText={this.onChangeText}
          autoCapitalize="none"
          value={search}
          clearButtonMode="while-editing"
          placeholder="Search"
          autoFocus
        />
        <Button onPress={buttonFunc} disabled={isSubmitting}>
          <ButtonText>
            {cancelOrDone}
          </ButtonText>
        </Button>
      </Container>
    )
  }
}

SearchHeader.propTypes = {
  onChangeText: PropTypes.func,
  cancelOrDone: PropTypes.oneOf(['Cancel', 'Done']),
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
}

SearchHeader.defaultProps = {
  onChangeText: () => null,
  onSubmit: () => null,
  onCancel: () => navigationService.back(),
  style: {},
  cancelOrDone: 'Cancel',
}
