import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import navigationService from '../utilities/navigationService'

import withLoadingAndErrors from './withLoadingAndErrors'

const channelCanAddToQuery = gql`
  query ChannelCanAddToQuery($id: ID!) {
    channel(id: $id) {
      __typename
      id
      can {
        add_to
      }
    }
  }
`

export default (WrappedComponent) => {
  class AddToWithContext extends Component {
    static propTypes = {
      abilityData: PropTypes.shape({
        channel: PropTypes.shape({
          can: PropTypes.shape({
            add_to: PropTypes.bool.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
    }

    static defaultProps = {
      abilityData: {
        channel: {
          can: {
            add_to: false,
          },
        },
      },
    }

    render() {
      const {
        abilityData: {
          channel: {
            can,
          },
        },
      } = this.props

      return (
        <WrappedComponent
          {...this.props}
          can={can}
        />
      )
    }
  }

  return graphql(channelCanAddToQuery, {
    name: 'abilityData',
    options: () => {
      const { params: { id } } = navigationService.getPreviousRoute()
      return { variables: { id } }
    },
    skip: () => {
      const { routeName } = navigationService.getPreviousRoute()
      return routeName !== 'channel'
    },
  })(withLoadingAndErrors(AddToWithContext, {
    dataKeys: ['abilityData'],
  }))
}
