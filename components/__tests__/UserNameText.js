import 'react-native'

import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import UserNameText from '../UserNameText'

const user = {
  name: 'Damon Zucconi',
  slug: 'damon-zucconi',
}

test('renders correctly', () => {
  const userName = shallow(
    <UserNameText user={user} />,
  )
  expect(toJSON(userName)).toMatchSnapshot()
})
