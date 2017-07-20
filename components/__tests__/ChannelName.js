import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import ChannelNameText from '../ChannelNameText'

const channel = {
  title: 'Arena',
  visibility: 'private',
}

test('renders correctly', () => {
  const tree = renderer.create(
    <ChannelNameText channel={channel} />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
