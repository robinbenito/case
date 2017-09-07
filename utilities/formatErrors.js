export default (err, separator = '; ') =>
  (err.graphQLErrors &&
    err.graphQLErrors.map(({ message }) => message).join(separator)
  ) || err.message
