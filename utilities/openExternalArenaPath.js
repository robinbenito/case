import { WebBrowser } from 'expo'

const EXTERNAL_ARENA_URL = 'https://www.are.na'

export default (path) => {
  const url = [EXTERNAL_ARENA_URL, path].join('/')
  return WebBrowser.openBrowserAsync(url)
}
