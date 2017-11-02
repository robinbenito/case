import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import ChannelNameText from '../ChannelNameText'

const channel = {
  title: 'Arena',
  visibility: 'private',
}

xtest('renders correctly', () => {
  const tree = shallow(
    <ChannelNameText channel={channel} />,
  )
  expect(toJSON(tree)).toMatchSnapshot()
})
