import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { Colors, Border, Units, Typography } from '../constants/Style'
import { Input } from '../components/UI/Inputs'
import navigationService from '../utilities/navigationService'

export const SEARCH_BAR_HEIGHT = 28

const SearchInput = styled(Input)`
  flex: 1;
  border-radius: ${Border.borderRadius};
  background-color: ${Colors.semantic.background};
  height: ${SEARCH_BAR_HEIGHT};
  margin-left: ${Units.scale[2]};
  padding-horizontal: ${Units.scale[1]};
  padding-vertical: ${Units.scale[1]};
  font-size: ${Typography.fontSize.base};
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
  cancelOrDone: 'Cancel',
}
