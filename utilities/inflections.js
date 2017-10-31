export const pluralize = (count, noun, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`

export const capitalize = x =>
  x && x[0].toUpperCase() + x.substring(1)
