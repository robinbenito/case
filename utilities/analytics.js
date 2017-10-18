import { Analytics, PageHit, Event } from 'expo-analytics'
import Config from '../config'

const analytics = new Analytics(Config.ANALYTICS_ID)

export const trackEvent = ({ category, action, label, value }) =>
  analytics.event(new Event(category, action, label, value))

export const trackPage = ({ page }) =>
  analytics.hit(new PageHit(page))

export default analytics
