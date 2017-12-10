import React from 'react'
import { openModal } from '../Modal'
import BlockModalMenu from './index'

const onBlockLongPress = block => () => {
  openModal({
    children: <BlockModalMenu
      block={block}
    />,
  })
}

export default onBlockLongPress
