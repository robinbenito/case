import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import HeaderRightButton from '../HeaderRightButton'

test('renders correctly', () => {
  const tree = shallow(
    <HeaderRightButton text="Done" />,
  )
  expect(toJSON(tree)).toMatchSnapshot()
})
