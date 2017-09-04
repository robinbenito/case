import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import FeedGroupSentence from '../FeedGroupSentence'

const group = {
  id: '3630_15271_added_1501702906',
  key: '3630_15271_added_1501702906',
  length: 1,
  user: {
    name: 'Édouard U.',
    slug: 'edouard-u',
  },
  is_single: true,
  verb: 'connected',
  object: {
    __typename: 'Connectable',
    id: 1164746,
    title: 'tumblr_noj7p2hXzj1rz4sfeo1_r1_540.jpg',
  },
  object_phrase: 'an image',
  connector: 'to',
  target: {
    __typename: 'Channel',
    id: 15271,
    title: 'Picture',
    visibility: 'public',
  },
  target_phrase: 'Picture',
  created_at: '19 minutes ago',
}

test('renders correctly', () => {
  const tree = shallow(
    <FeedGroupSentence group={group} />,
  )
  expect(toJSON(tree)).toMatchSnapshot()
})
