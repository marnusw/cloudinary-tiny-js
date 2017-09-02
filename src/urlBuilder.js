const makeBaseUrl = ({
  cloudName,
  secure = true,
  subDomain = 'res',
  hostName = `${subDomain}.cloudinary.com`,
}, resourceType) => `http${secure ? 's' : ''}://${hostName}/${cloudName}/${resourceType}/`

const compiler = (compileParameter, defaultTransform) => {
  const compile = parameters => (
    Object.keys(parameters)
      .map(param => compileParameter(param, parameters[param]))
      .join(',')
  )

  return (transform) => !transform ? '' : (
    '/' + Array.isArray(transform)
      ? transform.map(compile).join('/')
      : compile({...defaultTransform, ...transform})
  )
}

export default (options) => (resourceType, compileParameter, defaultTransform) => {
  const baseUrl = makeBaseUrl(options, resourceType)
  const compile = compiler(compileParameter, defaultTransform)

  return type => (publicId, transform) => (
    `${baseUrl}/${type}${compile(transform)}/${publicId}`
  )
}
