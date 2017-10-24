import formatErrors from './formatErrors'
import { sendAlert } from '../components/Alerts'

export default err =>
  sendAlert({
    type: 'alert',
    children: formatErrors(err),
  })
