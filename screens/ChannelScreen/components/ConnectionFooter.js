import React from 'react'
import PropTypes from 'prop-types'

import navigationService from '../../../utilities/navigationService'

import FlatListFooter from '../../../components/UI/Layout/FlatListFooter'
import LargeButton from '../../../components/UI/Buttons/LargeButton'

const navigateToConnectWithChannel = ({ id, title }) => () =>
  navigationService.navigate('connect', {
    title,
    connectable_id: id,
    connectable_type: 'CHANNEL',
  })

const ConnectionFooter = ({ channel, ...rest }) => (
  <FlatListFooter {...rest}>
    <LargeButton space={1} onPress={navigateToConnectWithChannel(channel)}>
      Connect &rarr;
    </LargeButton>
  </FlatListFooter>
)

ConnectionFooter.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

export default ConnectionFooter
