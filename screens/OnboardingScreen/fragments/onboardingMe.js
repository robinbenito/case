import gql from 'graphql-tag'

export default gql`
  fragment OnboardingMe on Me {
    id
    feed {
      total
    }
  }
`
