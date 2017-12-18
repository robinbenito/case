// Here we require a file that is not checked in, so
// ignore this error
/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import { Analytics, PageHit, Event } from 'expo-analytics'
import Config from '../config'
import formatErrors from './formatErrors'

const analytics = new Analytics(Config.ANALYTICS_ID)

export const trackEvent = ({ category, action, label, value }) =>
  analytics.event(new Event(category, action, label, value))

export const trackPage = ({ page }) =>
  analytics.hit(new PageHit(page))

export const trackError = error =>
  analytics.event(new Event('Error', '', 'Error message', error))

export const trackErrors = errors => trackError(formatErrors(errors))

export default analytics
