import React from 'react'

import FeedContainer from './components/FeedContainer'

export default class FeedScreen extends React.Component {
  render() {
    return (
      <FeedContainer limit={100} />
    )
  }
}
