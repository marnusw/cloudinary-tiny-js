import baseUrl from './baseUrl'
import { imageTransform, formatParameter } from './imageTransform'


export default function cloudinary(urlOptions, defaultTransformations) {
  const base = baseUrl(urlOptions)

  return (publicId, transforms) => {
    let extension = ''
    let options

    if (Array.isArray(transforms)) {
      options = transforms.map(imageTransform).join('/')
    } else {
      options = imageTransform({...defaultTransformations, ...transforms})
      extension = formatParameter(transforms.format)
    }

    return base + (options.length ? (options + '/') : '') + publicId + extension
  }
}
