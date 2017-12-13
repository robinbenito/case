import { values } from 'lodash'

import AddMenuIcons from './components/AddMenu/icons'

const logo = require('./assets/images/logo.png')
const searchIcon = require('./assets/images/searchIcon.png')

export default {
  images: [
    logo,
    searchIcon,
    ...values(AddMenuIcons),
  ],
}
