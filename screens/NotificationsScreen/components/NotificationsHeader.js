import React from 'react'
import styled from 'styled-components/native'

import NotificationsCount from '../../../components/NotificationCount'
import { Units, Border } from '../../../constants/Style'
import { H1 } from '../../../components/UI/Texts'

const TOP_BAR_HEIGHT = 70

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${TOP_BAR_HEIGHT};
  margin-top: ${Units.base};
  border-bottom-width: ${Border.borderWidth};
  border-bottom-color: ${Border.borderColor};
  padding-horizontal: ${Units.base};
`

const Headline = styled(H1)`
  font-weight: normal;
`
export default class NotificationsHeader extends React.Component {
  render() {
    return (
      <Header>
        <Headline>Notifications</Headline>
        <NotificationsCount />
      </Header>
    )
  }
}
