import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import { FollowButton } from '../FollowButton'

test('renders correctly', () => {
  const tree = shallow(
    <FollowButton id="damon-zucconi" type="USER" />,
  )
  expect(toJSON(tree)).toMatchSnapshot()
})
