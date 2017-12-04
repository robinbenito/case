import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ActivityIndicator } from 'react-native'

import navigationService from '../../../utilities/navigationService'

import { CenterColumn } from '../../../components/UI/Layout'
import { ButtonLabel, Button } from '../../../components/UI/Buttons'

import { Units } from '../../../constants/Style'

const Container = styled(CenterColumn)`
  margin-vertical: ${Units.base};
`

const navigateToConnectWithChannel = ({ id, title }) => () =>
  navigationService.navigate('connect', {
    title,
    connectable_id: id,
    connectable_type: 'CHANNEL',
  })

export const ConnectionFooter = ({ channel, ...rest }) => (
  <Container {...rest}>
    <Button space={1} onPress={navigateToConnectWithChannel(channel)}>
      <ButtonLabel>Connect &rarr;</ButtonLabel>
    </Button>
  </Container>
)

ConnectionFooter.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

export const LoadingFooter = ({ loading, ...rest }) => (
  <Container {...rest}>
    {loading &&
      <ActivityIndicator
        animating
        size="small"
      />
    }
  </Container>
)

LoadingFooter.propTypes = {
  loading: PropTypes.bool.isRequired,
}
