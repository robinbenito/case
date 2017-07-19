import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import ChannelNameText from '../ChannelNameText'
import colors from '../../constants/Colors'

const channel = {
  title: 'Arena',
  visibility: 'private',
}

test('renders correctly', () => {
  const tree = renderer.create(
    <ChannelNameText channel={channel} />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
  expect(tree.children[0].props.style[1].color).toBe(colors.private)
  expect(tree.children[0].children[0]).toBe('Arena')
})
