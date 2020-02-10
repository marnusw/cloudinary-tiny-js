const invariantFor = type => (
  condition,
  parameter,
  value,
  message,
  source = `/image_transformation_reference#${parameter}_parameter`,
) => {
  if (!condition) {
    value = typeof value === 'string' ? `'${value}'` : value
    source = source ? `http://cloudinary.com/documentation${source}` : null
    throw new Error(
      `Cloudinary ${type}:: ${parameter} ${message}, received: ${value}${
        source ? ` - see ${source}` : ''
      }`,
    )
  }
}

export const invariant = invariantFor('')
export const invariantImage = invariantFor('Image ')
export const invariantVideo = invariantFor('Video ')

export const isNumber = value => typeof value === 'number' || !Number.isNaN(Number(value))

export const startsWith = (needle, haystack) => haystack.indexOf(needle) === 0

export const includes = (needle, haystack) => haystack.indexOf(needle) > -1

export const shouldBeOneOf = possibleValues => `should be one of ['${possibleValues.join(`', '`)}']`
