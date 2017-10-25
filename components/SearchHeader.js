import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { Icon } from './SearchIcon'
import { Colors, Border, Units, Typography } from '../constants/Style'
import { Input } from '../components/UI/Inputs'
import navigationService from '../utilities/navigationService'

export const SEARCH_BAR_HEIGHT = 28

const SearchInput = styled(Input)`
  flex: 1;
  font-size: ${Typography.fontSize.base};
  height: ${SEARCH_BAR_HEIGHT};
  background-color: ${Colors.gray.semiLight};
  padding-vertical: ${Units.scale[1]};
  border-radius: ${Border.borderRadius};
`

const InputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  border-radius: ${Border.borderRadius};
  background-color: ${Colors.gray.semiLight};
  margin-left: ${Units.scale[2]};
  padding-left: ${Units.scale[2]};
  justify-content: center;
  align-items: center;
`

const SearchIcon = styled(Icon)`
  width: 15;
  height: 15;
`

const Button = styled.TouchableOpacity`
  padding-horizontal: ${Units.scale[2]};
`

const ButtonText = styled.Text`
  font-size: ${Typography.fontSize.medium};
  line-height: ${Typography.lineHeightFor('medium')};
  color: ${Colors.gray.semiBold};
`

const Container = styled.View`
  position: absolute;
  top: ${SEARCH_BAR_HEIGHT};
  flex-direction: row;
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
  }

  onSubmit = () => {
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
    const { cancelOrDone, onCancel, autoFocus } = this.props
    const { search, isSubmitting } = this.state
    const buttonFunc = cancelOrDone === 'Cancel' ? onCancel : this.onSubmit

    return (
      <Container>
        <InputContainer>
          <SearchIcon />
          <SearchInput
            onChangeText={this.onChangeText}
            autoCapitalize="none"
            value={search}
            clearButtonMode="while-editing"
            placeholder="Search"
            autoFocus={autoFocus}
          />
        </InputContainer>

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
  autoFocus: PropTypes.bool,
}

SearchHeader.defaultProps = {
  onChangeText: () => null,
  onSubmit: () => null,
  onCancel: () => navigationService.back(),
  cancelOrDone: 'Cancel',
  autoFocus: false,
}
