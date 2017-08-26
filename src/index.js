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


const numOptionSymbols = {
  height: 'h_',
  zoom: 'z_',
  x: 'x_',
  y: 'y_',
  radius: 'r_',
}

export function transformOption(value, key) {
  switch (key) {

    case 'height':
    case 'zoom':
    case 'x':
    case 'y':
      if (process.env.NODE_ENV !== 'production') {
        if (typeof value !== 'number') {
          throw new Error(`Cloudinary :: ${key} should be a number, received: ${value}`)
        }
      }
      return numOptionSymbols[key] + value

    ////////////////////////////////////

    case 'width':
      if (process.env.NODE_ENV !== 'production') {
        if (typeof value !== 'number' && !value.startsWith('auto')) {
          throw new Error('Cloudinary :: width should be a number or start with auto, received: ' + value)
        }
      }
      return 'w_' + value

    ////////////////////////////////////

    case 'crop':
      if (process.env.NODE_ENV !== 'production') {
        const cropOptions = [
          'scale', 'fit', 'limit', 'mfit', 'fill', 'lfill', 'pad', 'mpad', 'crop', 'thumb', 'imagga_crop', 'imagga_scale'
        ]
        if (!cropOptions.includes(value)) {
          throw new Error(`Cloudinary :: crop received ${value}, should be one of ['${cropOptions.join('\', \'')}']`)
        }
      }
      return 'c_' + value

    ////////////////////////////////////

    case 'aspectRatio':
      if (process.env.NODE_ENV !== 'production') {
        if (typeof value !== 'number' && !value.match(/^\d+:\d+$/)) {
          throw new Error('Cloudinary :: aspectRatio should be a number or have the form x:y, received: ' + value)
        }
      }
      return 'ar_' + value

    ////////////////////////////////////

    case 'gravity':
      if (process.env.NODE_ENV !== 'production') {
        const gravityOptions = [
          'north_west', 'north', 'north_east', 'west', 'center', 'east', 'south_west', 'south', 'south_east',
          'xy_center', 'face', 'face:center', 'face:auto', 'faces', 'faces:center', 'faces:auto', 'body',
          'body:face', 'ocr_text', 'adv_face', 'adv_faces', 'adv_eyes', 'custom', 'custom:face', 'custom:faces',
          'custom:adv_face', 'custom:adv_faces',
        ]
        if (!gravityOptions.includes(value) && !value.startsWith('auto')) {
          throw new Error(`Cloudinary :: gravity received ${value}, should be 'auto' or one of ['${gravityOptions.join('\', \'')}']`)
        }
      }
      return 'g_' + value

    ////////////////////////////////////

    case 'fetchFormat':
      if (process.env.NODE_ENV !== 'production') {
        const formatOptions = [
          'auto', 'jpg', 'jpe', 'jpeg', 'jpc', 'jp2', 'j2k', 'wdp', 'jxr', 'hdp', 'png', 'gif', 'webp', 'bmp',
          'tif', 'tiff', 'ico', 'pdf', 'ps', 'ept', 'eps', 'eps3', 'psd', 'svg', 'ai', 'djvu', 'flif',
        ]
        if (!formatOptions.includes(value)) {
          throw new Error(`Cloudinary :: fetchFormat received ${value}, should be 'auto' or one of ['${formatOptions.join('\', \'')}']`)
        }
      }
      return 'f_' + value

    ////////////////////////////////////

    case 'quality':
      if (process.env.NODE_ENV !== 'production') {
        const qualityOptions = ['auto', 'auto:best', 'auto:good', 'auto:eco', 'auto:low', 'jpegmini']
        if (
          (typeof value === 'number' && (value < 1 || value > 100))
          && !qualityOptions.includes(value)
          && !value.match(/^\d+:\d+$/)
        ) {
          throw new Error('Cloudinary :: quality should be a number between 1 and 100, an \'auto\' options or have the form x:y, received: ' + value)
        }
      }
      return 'q_' + value

    ////////////////////////////////////

    case 'radius':
      if (process.env.NODE_ENV !== 'production') {
        if (value !== 'max' && !value.match(/^\d+(?::\d+){0,3}$/)) {
          throw new Error('Cloudinary :: quality should be a number or have the form x:y, received: ' + value)
        }
      }
      return 'r_' + value

    ////////////////////////////////////

    case 'angle':
      if (process.env.NODE_ENV !== 'production') {
        const angleOptions = ['auto_right', 'auto_left', 'ignore', 'vflip', 'hflip']
        if (
          (typeof value === 'number' && (value < 1 || value > 100))
          && !angleOptions.includes(value)
          && !value.match(/^\d+:\d+$/)
        ) {
          throw new Error('Cloudinary :: quality should be a number between 1 and 100, an \'auto\' options or have the form x:y, received: ' + value)
        }
      }
      return 'a_' + value

    ////////////////////////////////////

    case 'effect':
      return 'e_' + value

    ////////////////////////////////////

    case 'opacity':
      if (process.env.NODE_ENV !== 'production') {
        if (typeof value !== 'number' || value < 1 || value > 100) {
          throw new Error('Cloudinary :: opacity should be a number between 0 and 100, received: ' + value)
        }
      }
      return 'o_' + value

    ////////////////////////////////////

    case 'border':
      if (typeof value === 'object') {
        if (typeof value.width !== 'string' || !value.width.endsWith('px')) {
          value.width = value.width + 'px'
        }
        value = value.width + '_solid_' + value.color
      }
      if (process.env.NODE_ENV !== 'production') {
        if (value.match(/^\d+px_solid_[a-z0-9:]+$/)) {
          throw new Error('Cloudinary :: border should be an object with width & color or a string `width_solid_color`, received: ' + value)
        }
      }
      return 'bo_' + value

    ////////////////////////////////////

    case 'background':
      if (process.env.NODE_ENV !== 'production') {
        const backgroundOptions = ['auto:border', 'auto:predominant', 'auto:border_contrast', 'auto:predominant_contrast']
        if (value.startsWith('auto:') && !backgroundOptions.includes(value)) {
          throw new Error(`Cloudinary :: background should be a color or one of ['${backgroundOptions.join('\', \'')}'], received: ${value}`)
        }
      }
      return 'b_' + value

    ////////////////////////////////////

    case 'defaultImage':
      if (process.env.NODE_ENV !== 'production') {
        if (value.match(/^[\w+-]+\.[\w]{3,4}$/)) {
          throw new Error('Cloudinary :: defaultImage must include a file extension, received: ' + value)
        }
      }
      return 'd_' + value

    ////////////////////////////////////

    case 'delay':
      if (process.env.NODE_ENV !== 'production') {
        if (typeof value !== 'number' || value < 1) {
          throw new Error('Cloudinary :: delay should be an integer larger than 0, received: ' + value)
        }
      }
      return 'dl_' + value

    ////////////////////////////////////

    case 'color':
      return 'co_' + value

    ////////////////////////////////////

    case 'colorSpace':
      if (process.env.NODE_ENV !== 'production') {
        const colorSpaceOptions = ['srgb', 'tinysrgb', 'no_cmyk']
        if (!colorSpaceOptions.includes(value) && !value.match(/^cs_icc:[\w+-]+\.[\w]{3,4}$/)) {
          throw new Error(`Cloudinary :: colorSpace received ${value}, should be 'cs_icc:(public_id)' or one of ['${colorSpaceOptions.join('\', \'')}']`)
        }
      }
      return 'cs_' + value

    ////////////////////////////////////

    case 'dpr':
      if (process.env.NODE_ENV !== 'production') {
        if (value !== 'auto' && typeof value !== 'number' && value <= 0) {
          throw new Error('Cloudinary :: dpr should be `auto` or number larger than 0, received: ' + value)
        }
      }
      return 'dpr_' + value

    ////////////////////////////////////

    case 'page':
      if (process.env.NODE_ENV !== 'production') {
        if (typeof value !== 'number' || value < 1) {
          throw new Error('Cloudinary :: page should be an integer larger than 0, received: ' + value)
        }
      }
      return 'pg_' + value

    ////////////////////////////////////

    case 'density':
      if (process.env.NODE_ENV !== 'production') {
        if (typeof value !== 'number' || value < 50 || value > 300) {
          throw new Error('Cloudinary :: density should be an integer between 50 and 300, received: ' + value)
        }
      }
      return 'dn_' + value

    ////////////////////////////////////

    case 'flags':
      return 'fl_' + value

    ////////////////////////////////////

    default:
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(`Cloudinary :: unknown tranform option provided: ${key}`)
      }
  }
}
