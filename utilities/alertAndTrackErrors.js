import alertErrors from './alertErrors'
import { trackErrors } from './analytics'

const alertAndTrackErrors = (errs) => {
  alertErrors(errs)
  trackErrors(errs)
}

export default alertAndTrackErrors
