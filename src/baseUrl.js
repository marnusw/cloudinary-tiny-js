export default ({
  cloudName,
  secure = true,
  subDomain = 'res',
  hostName = `${subDomain}.cloudinary.com`,
}) => `http${secure ? 's' : ''}://${hostName}/${cloudName}/image/upload/`
