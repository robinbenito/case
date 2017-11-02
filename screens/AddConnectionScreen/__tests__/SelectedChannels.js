import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import SelectedChannels from '../components/SelectedChannels'

const channelUno = {
  title: 'Round things',
  visibility: 'private',
}
const channelDos = {
  title: 'Square things',
  visibility: 'private',
}

xtest('renders correctly', () => {
  const tree = shallow(
    <SelectedChannels channels={[channelUno, channelDos]} />,
  )
  expect(toJSON(tree)).toMatchSnapshot()
})
