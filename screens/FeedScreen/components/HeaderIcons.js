import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import NotificationCountWithData from '../../../components/NotificationCount'
import SearchIcon from '../../../components/SearchIcon'

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

const HeaderIcons = props => (
  <Container>
    <SearchIcon />
    <NotificationCountWithData
      onPress={() => props.navigation.navigate('notifications')}
    />
  </Container>
)

HeaderIcons.propTypes = {
  navigation: PropTypes.any.isRequired,
}

export default HeaderIcons
