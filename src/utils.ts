const invariantFor = (type: string) => (
  condition: unknown,
  parameter: string,
  value: unknown,
  message: string,
  source: string | null = `/image_transformation_reference#${parameter}_parameter`,
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

export const invariantImage = invariantFor('Image ')

export const isNumber = (value: unknown) =>
  typeof value === 'number' || !Number.isNaN(Number(value))

export const shouldBeOneOf = (possibleValues: unknown[]) =>
  `should be one of ['${possibleValues.join(`', '`)}']`

// IE11 ponyfills
export const startsWith = (needle: string, haystack: string) => haystack.indexOf(needle) === 0
export const includes = (needle: string, haystack: string[]) => haystack.indexOf(needle) > -1
