const makeBaseUrl = ({
  cloudName,
  secure = true,
  subDomain = 'res',
  hostName = `${subDomain}.cloudinary.com`,
}, resourceType, type) => `http${secure ? 's' : ''}://${hostName}/${cloudName}/${resourceType}/${type}`


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


export default (options) => (
  compileParameter,
  defaultTransform,
  resourceType = compileParameter.resourceType,
) => {
  const compile = compiler(compileParameter, defaultTransform)
  return type => {
    const baseUrl = makeBaseUrl(options, resourceType, type)
    return (publicId, transform) => `${baseUrl}${compile(transform)}/${publicId}`
  }
}
