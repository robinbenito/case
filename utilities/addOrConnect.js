import navigationService from './navigationService'
import uploadImageIfPresent from './uploadImageIfPresent'

export default ({ variables, mutation, channel }) => {
  // If a channel is present we'll add it directly to that...
  if (channel) {
    const { image, source_url, ...rest } = variables

    const promise =
      uploadImageIfPresent(image)
      .then(({ location } = {}) => {
        const _variables = {
          ...rest,
          source_url: source_url || location,
          channel_ids: [channel.id],
        }

        return mutation({
          variables: _variables,
        })
      })

    navigationService.navigate('progress', {
      promise,
      label: `Connecting to ${channel.title}`,
      done: () => {
        navigationService.reset('channel', channel)
      },
    })

    return promise
  }

  // ...otherwise we just pass the variables onto the connect route
  navigationService.navigate('connect', {
    ...variables,
  })
}
