import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'

import FeedContainer from './components/FeedContainer'
import { Container } from '../../components/UI/Layout'
import { sendAlert } from '../../components/Alerts'

class FeedScreen extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  componentDidUpdate() {
    const { data: { loading, error, alerts } } = this.props

    if (loading || error) return

    const { is_confirmed, unconfirmed_email } = alerts

    if (!is_confirmed) {
      sendAlert({
        id: 'feed:unconfirmed_account',
        type: 'confirmation',
        children: 'Please check your email to confirm your account.',
      })
    }

    if (unconfirmed_email) {
      sendAlert({
        id: 'feed:unconfirmed_email',
        type: 'confirmation',
        children: `Please check your email to confirm ${unconfirmed_email}`,
      })
    }
  }

  render() {
    return (
      <Container>
        <FeedContainer limit={20} />
      </Container>
    )
  }
}

const AlertsQuery = gql`
  query AlertsQuery {
    alerts: me {
      id
      is_confirmed
      unconfirmed_email
    }
  }
`

const FeedScreenWithData = graphql(AlertsQuery, {
  fetchPolicy: 'network-only',
})(FeedScreen)

export default FeedScreenWithData
