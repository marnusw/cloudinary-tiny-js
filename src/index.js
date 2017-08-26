export const baseUrl = ({
  cloudName,
  secure = true,
  subDomain = 'res',
  hostName = `${subDomain}.cloudinary.com`,
}) => `http${secure ? 's' : ''}://${hostName}/${cloudName}/image/upload/`


export default function cloudinary(urlOptions, defaultTransformations) {
  const base = baseUrl(urlOptions)

  return (publicId, transforms) => {
    const options = {...defaultTransformations, ...transforms}
    let extension = ''

    if (options.format) {
      if (process.env.NODE_ENV !== 'production') {
        const formatOptions = [
          'jpg', 'jpe', 'jpeg', 'jpc', 'jp2', 'j2k', 'wdp', 'jxr', 'hdp', 'png', 'gif', 'webp', 'bmp',
          'tif', 'tiff', 'ico', 'pdf', 'ps', 'ept', 'eps', 'eps3', 'psd', 'svg', 'ai', 'djvu', 'flif',
        ]
        if (!formatOptions.includes(options.format)) {
          throw new Error(`Cloudinary :: format received ${options.format}, should be 'auto' or one of ['${formatOptions.join('\', \'')}']`)
        }
      }
      extension = options.format ? `.${options.format}` : ''
      delete options.format
    }

    return base + compileTransform(options) + publicId + extension
  }
}

function compileTransform(options) {
  return ''
}
