import { invariant, includes, shouldBeOneOf } from './utils'

const typeOptions = [
  'upload',
  'fetch',
  'facebook',
  'twitter',
  'twitter_name',
  'instagram',
  'instagram_name',
  'gplus',
  'gravatar',
]

export const compile = (parameterSet, transform, defaultTransform) => {
  if (!parameterSet) {
    return ''
  }

  const compile = parameters =>
    Object.keys(parameters)
      .map(param => parameterSet(param, parameters[param]))
      .filter(Boolean)
      .join(',')

  const compiledTransform = Array.isArray(transform)
    ? transform.map(compile).join('/')
    : compile({ ...defaultTransform, ...transform })

  return compiledTransform ? `/${compiledTransform}` : ''
}

const urlBuilder = (parameterSets = {}, baseResourceType = 'image') => ({
  cloudName,
  cdnSubdomain = false,
  cname = 'res.cloudinary.com',
  secure: defaultSecure = true,
  defaults: {
    type: defaultType = 'upload',
    resourceType: defaultResourceType = baseResourceType,
    ...defaultTransform
  } = {},
}) => {
  process.env.NODE_ENV !== 'production' &&
    invariant(
      cloudName,
      'cloudName',
      cloudName,
      'configuration is required',
      '/node_additional_topics#configuration_options',
    )

  const baseUrl = `${cname}/${cloudName}/`
  let sub = ''

  return (publicId, options = {}) => {
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

    process.env.NODE_ENV !== 'production' &&
      invariant(
        !transform ||
          Object.keys(transform).length === 0 ||
          resourceType === 'raw' ||
          includes(resourceType, Object.keys(parameterSets)),
        'resourceType',
        resourceType,
        shouldBeOneOf(['raw', ...Object.keys(parameterSets)]) +
          ', fix the resource type or add additional transform parameters to the configuration',
        null,
      )

    process.env.NODE_ENV !== 'production' &&
      invariant(includes(type, typeOptions), 'type', type, shouldBeOneOf(typeOptions), null)

    process.env.NODE_ENV !== 'production' &&
      invariant(
        !cdnSubdomain || typeof cdnSubdomain === 'function',
        'cdnSubdomain',
        cdnSubdomain,
        'should be a CRC function: `(string) => number`',
        null,
      )

    if (cdnSubdomain) {
      sub = `a${(cdnSubdomain(publicId) % 5) + 1}.`
    }

    transform = compile(parameterSets[resourceType], transform, defaultTransform)

    return `http${
      secure ? 's' : ''
    }://${sub}${baseUrl}${resourceType}/${type}${transform}/v${version}/${publicId}`
  }
}

export default urlBuilder
