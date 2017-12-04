import gql from 'graphql-tag'

import NotificationSentence from '../../../components/NotificationSentence'
import NotificationCount from '../../../components/NotificationCount'

export default gql`
  query NotificationsQuery($offset: Int, $limit: Int){
    me {
      id
      __typename
      feed(offset: $offset, limit: $limit, type: "Notification") {
        __typename
        notifications: deeds {
          ...NotificationSentence
        }
      }
      ...UnreadNotificationsCount
    }
  }
  ${NotificationSentence.fragments.notificationSentence}
  ${NotificationCount.fragments.unreadNotificationsCount}
`
