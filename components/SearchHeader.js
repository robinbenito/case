import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { Icon } from './SearchIcon'
import { Colors, Border, Units, Typography } from '../constants/Style'
import { Input } from '../components/UI/Inputs'
import navigationService from '../utilities/navigationService'

const SEARCH_HEADER_V_PADDING = Units.scale[1]
const SEARCH_HEADER_LABEL_LINE_HEIGHT = Typography.lineHeightFor(Typography.fontSize.base)
export const SEARCH_HEADER_HEIGHT = (SEARCH_HEADER_V_PADDING * 2) + SEARCH_HEADER_LABEL_LINE_HEIGHT

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${Units.scale[1]};
  padding-left: ${Units.scale[2]};
`

const InputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: ${Units.scale[2]};
  background-color: ${Colors.gray.semiLight};
  border-radius: ${Border.borderRadius};
  background-color: ${Colors.gray.semiLight};
`

const SearchInput = styled(Input)`
  flex: 1;
  padding-vertical: ${SEARCH_HEADER_V_PADDING};
  height: ${SEARCH_HEADER_HEIGHT};
  font-size: ${Typography.fontSize.base};
  line-height: ${SEARCH_HEADER_LABEL_LINE_HEIGHT};
  background-color: transparent;
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
    // TODO: Avoid doing string comparison for the submit function
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
  cancelOrDone: PropTypes.oneOf(['Cancel', 'Done', 'Connect']),
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
