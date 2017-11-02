import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import FeedGroupSentence from '../FeedGroupSentence'

const group = {
  id: '3630_15271_added_1501702906',
  is_read: false,
  user: {
    name: 'Édouard U.',
    slug: 'edouard-u',
  },
  action: 'connected',
  item: {
    __typename: 'Connectable',
    id: 1164746,
    title: 'tumblr_noj7p2hXzj1rz4sfeo1_r1_540.jpg',
  },
  item_title: 'an image',
  connector: 'to',
  target: {
    __typename: 'Channel',
    id: 15271,
    title: 'Picture',
    visibility: 'public',
  },
  created_at: '19 minutes ago',
}

xtest('renders correctly', () => {
  const tree = shallow(
    <FeedGroupSentence group={group} />,
  )
  expect(toJSON(tree)).toMatchSnapshot()
})
