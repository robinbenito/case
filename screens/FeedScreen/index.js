import React from 'react'
import styled from 'styled-components/native'

import AddMenu from '../../components/AddMenu'
import FeedContainer from './components/FeedContainer'

const FeedWrapper = styled.View`
  position: relative;
  flex: 1;
`

export default class FeedScreen extends React.Component {
  render() {
    return (
      <FeedWrapper>
        <FeedContainer limit={20} />
        <AddMenu />
      </FeedWrapper>
    )
  }
}
