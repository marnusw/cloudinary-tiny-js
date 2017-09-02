export const invariant = (
  condition, parameter, value, message,
  source = `/image_transformation_reference#${parameter}_parameter`
) => {
  if (!condition) {
    value = typeof value === 'string' ? `'${value}'` : value
    source = `http://cloudinary.com/documentation${source}`
    throw new Error(
      `Cloudinary Image :: ${parameter} ${message}, received: ${value} - see ${source}`
    )
  }
}

export const isNumber = (value) => typeof value === 'number' || !Number.isNaN(Number(value))

export const startsWith = (needle, haystack) => haystack.indexOf(needle) === 0

export const includes = (needle, haystack) => haystack.indexOf(needle) > -1

export const shouldBeOneOf = (possibleValues) => `should be one of ['${possibleValues.join(`', '`)}']`

