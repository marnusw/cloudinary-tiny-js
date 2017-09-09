import { invariantConfig as invariant, includes, shouldBeOneOf } from './utils'

const typeOptions = [
  'upload', 'fetch', 'facebook', 'twitter', 'twitter_name', 'instagram', 'instagram_name', 'gplus', 'gravatar'
]


export const compile = (parameterSet, transform, defaultTransform) => {
  if (!parameterSet || !transform) {
    return ''
  }

  const compile = parameters => (
    Object.keys(parameters)
      .map(param => parameterSet(param, parameters[param]))
      .join(',')
  )

  return '/' + (
    Array.isArray(transform)
      ? transform.map(compile).join('/')
      : compile({...defaultTransform, ...transform})
  )
}


const urlBuilder = (parameterSets, defaultResourceType = 'image') => ({
  cloudName,
  cname = 'res.cloudinary.com',
  defaultOptions: {
    secure: defaultSecure = true,
    type: defaultType = 'upload',
    ...defaultTransform
  } = {},
}) => {
  const baseUrl = `://${cname}/${cloudName}/`

  return (publicId, options) => {
    let {
      resourceType = defaultResourceType,
      secure = defaultSecure,
      type = defaultType,
      version = '1',
      ...transform
    } = options

    if (options.transform) {
      transform = options.transform
    } else if (Array.isArray(options)) {
      transform = options
    }

    process.env.NODE_ENV !== 'production' && invariant(
      resourceType === 'raw' || includes(resourceType, Object.keys(parameterSets)),
      'resourceType', resourceType, shouldBeOneOf(Object.keys(parameterSets)),
    )

    process.env.NODE_ENV !== 'production' && invariant(
      includes(type, typeOptions), 'type', type, shouldBeOneOf(typeOptions),
    )

    const compiledTransform = compile(parameterSets[resourceType], transform, defaultTransform)

    return `http${secure ? 's' : ''}${baseUrl}${resourceType}/${type}${compiledTransform}/v${version}/${publicId}`
  }
}

export default urlBuilder
