import formatErrors from './formatErrors'
import { sendAlert } from '../components/Alerts'
import { trackErrors } from './analytics'

export default (err) => {
  trackErrors(err)
  sendAlert({
    type: 'alert',
    children: formatErrors(err),
  })
}
