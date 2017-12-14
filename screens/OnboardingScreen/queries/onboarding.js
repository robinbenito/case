import gql from 'graphql-tag'

import onboardingMeFragment from '../fragments/onboardingMe'

export default gql`
  query OnboardingQuery {
    me {
      ...OnboardingMe
    }
  }
  ${onboardingMeFragment}
`
