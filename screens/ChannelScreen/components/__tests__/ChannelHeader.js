import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import ChannelHeader from '../ChannelHeader'

const channel = {
  id: 666,
  title: 'My Teddy Bears',
  visibility: 'private',
  counts: {
    connections: 420,
    channels: 24,
    blocks: 7,
  },
  can: {
    follow: true,
    manage: false,
  },
  user: {
    id: 99,
    slug: 'damon-zucconi',
    name: 'Damon Zucconi',
  },
  displayDescription: null,
  collaborators: [],
}

xtest('renders correctly', () => {
  const tree = shallow(
    <ChannelHeader channel={channel} type="BLOCK" />,
  )
  expect(toJSON(tree)).toMatchSnapshot()
})
