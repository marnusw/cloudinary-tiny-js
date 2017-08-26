import baseUrl from './baseUrl'
import { compileFormat, compileTransforms } from './compileTransforms'


export default function cloudinary(urlOptions, defaultTransformations) {
  const base = baseUrl(urlOptions)

  return (publicId, transforms) => {
    let extension = ''
    let options

    if (Array.isArray(transforms)) {
      options = transforms.map(compileTransforms).join('/')
    } else {
      options = compileTransforms({...defaultTransformations, ...transforms})
      extension = compileFormat(transforms.format)
    }

    return base + (options.length ? (options + '/') : '') + publicId + extension
  }
}
