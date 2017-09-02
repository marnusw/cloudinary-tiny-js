import { invariant, isNumber, startsWith, includes, shouldBeOneOf } from './utils'

// http://cloudinary.com/documentation/image_transformation_reference#format_parameter
const formatOptions = [
  'jpg', 'jpe', 'jpeg', 'jpc', 'jp2', 'j2k', 'wdp', 'jxr', 'hdp', 'png', 'gif', 'webp', 'bmp',
  'tif', 'tiff', 'ico', 'pdf', 'ps', 'ept', 'eps', 'eps3', 'psd', 'svg', 'ai', 'djvu', 'flif',
]

// http://cloudinary.com/documentation/image_transformation_reference#crop_parameter
const cropOptions = [
  'scale', 'fit', 'limit', 'mfit', 'fill', 'lfill', 'pad', 'mpad', 'crop', 'thumb', 'imagga_crop', 'imagga_scale'
]

// http://cloudinary.com/documentation/image_transformation_reference#gravity_parameter
const gravityOptions = [
  'north_west', 'north', 'north_east', 'west', 'center', 'east', 'south_west', 'south', 'south_east',
  'xy_center', 'face', 'face:center', 'face:auto', 'faces', 'faces:center', 'faces:auto', 'body',
  'body:face', 'ocr_text', 'adv_face', 'adv_faces', 'adv_eyes', 'custom', 'custom:face', 'custom:faces',
  'custom:adv_face', 'custom:adv_faces',
]

// http://cloudinary.com/documentation/image_transformation_reference#quality_parameter
const qualityOptions = ['auto', 'auto:best', 'auto:good', 'auto:eco', 'auto:low', 'jpegmini']

// http://cloudinary.com/documentation/image_transformation_reference#angle_parameter
const angleOptions = ['auto_right', 'auto_left', 'ignore', 'vflip', 'hflip']

// http://cloudinary.com/documentation/image_transformation_reference#background_parameter
const backgroundOptions = ['auto:border', 'auto:predominant', 'auto:border_contrast', 'auto:predominant_contrast']

// http://cloudinary.com/documentation/image_transformation_reference#color_parameter
// A color name or rgb: followed by an rgb[a] or rrggbb[aa] hex value
const colorRegex = /^(?:[a-z]+$|rgb:(?:[0-9a-f]{3,4}$|[0-9a-f]{6}$|[0-9a-f]{8}$))/i
const colorRegexStr = colorRegex.toString().replace(/[/^i]/g, '')


export const imageTransform = (parameters) => (
  Object.keys(parameters)
    .map(param => compileParameter(param, parameters[param]))
    .join(',')
)

export const formatParameter = (value) => {
  process.env.NODE_ENV !== 'production' && invariant(
    !value || includes(value, formatOptions),
    'format', value, shouldBeOneOf(formatOptions),
  )
  return value ? `.${value}` : ''
}

const numericParameters = {
  height: 'h_',
  zoom: 'z_',
  x: 'x_',
  y: 'y_',
}

export function compileParameter(parameter, value) {
  switch (parameter) {

    case 'height':
    case 'zoom':
    case 'x':
    case 'y':
      process.env.NODE_ENV !== 'production' && invariant(
        isNumber(value),
        parameter, value, 'should be a number',
      )
      return numericParameters[parameter] + value

    ////////////////////////////////////

    case 'width':
      process.env.NODE_ENV !== 'production' && invariant(
        isNumber(value) || value === 'auto' || startsWith('auto:', value),
        'width', value, `should be a number, 'auto', or a string starting with 'auto:'`,
      )
      return 'w_' + value

    ////////////////////////////////////

    case 'crop':
      process.env.NODE_ENV !== 'production' && invariant(
        includes(value, cropOptions),
        'crop', value, shouldBeOneOf(cropOptions),
      )
      return 'c_' + value

    ////////////////////////////////////

    case 'aspectRatio':
      process.env.NODE_ENV !== 'production' && invariant(
        isNumber(value) || value.match(/^\d+:\d+$/),
        'aspectRatio', value, 'should be a number or have the form x:y',
      )
      return 'ar_' + value

    ////////////////////////////////////

    case 'gravity':
      process.env.NODE_ENV !== 'production' && invariant(
        includes(value, gravityOptions) || value === 'auto' || startsWith('auto:', value),
        'gravity', value, `${shouldBeOneOf(gravityOptions)}, 'auto', or a string starting with 'auto:'`,
      )
      return 'g_' + value

    ////////////////////////////////////

    case 'fetchFormat':
      process.env.NODE_ENV !== 'production' && invariant(
        includes(value, ['auto', ...formatOptions]),
        'fetchFormat', value, `${shouldBeOneOf(['auto', ...formatOptions])} or 'auto'`,
      )
      return 'f_' + value

    ////////////////////////////////////

    case 'quality':
      process.env.NODE_ENV !== 'production' && invariant(
        (isNumber(value) && 1 <= +value && +value <= 100)
        || (typeof value === 'string' && value.match(/^\d+:\d+$/))
        || includes(value, qualityOptions),
        'quality', value, `${shouldBeOneOf(formatOptions)}, a number between 1 and 100, or have the form x:y`,
      )
      return 'q_' + value

    ////////////////////////////////////

    case 'radius':
      process.env.NODE_ENV !== 'production' && invariant(
        isNumber(value) || value === 'max' || value.match(/^\d+(?::\d+){0,3}$/),
        'radius', value, `should be a number, 'max' or have the form x[:y[:z[:u]]]`,
      )
      return 'r_' + value

    ////////////////////////////////////

    case 'angle':
      process.env.NODE_ENV !== 'production' && invariant(
        isNumber(value) || includes(value, angleOptions),
        'angle', value, `${shouldBeOneOf(angleOptions)} or a number`,
      )
      return 'a_' + value

    ////////////////////////////////////

    case 'effect':
      return 'e_' + value

    ////////////////////////////////////

    case 'opacity':
      process.env.NODE_ENV !== 'production' && invariant(
        isNumber(value) && 0 <= +value && +value <= 100,
        'opacity', value, 'should be a number between 0 and 100',
      )
      return 'o_' + value

    ////////////////////////////////////

    case 'border':
      if (typeof value === 'object') {
        process.env.NODE_ENV !== 'production' && invariant(
          'color' in value,
          'border', JSON.stringify(value), `should contain a 'color' property when provided as an object`,
        )
        if (typeof value.width !== 'string' || value.width.substr(value.width.length - 2, 2) !== 'px') {
          value.width = (value.width || 1) + 'px'
        }
        value = value.width + '_solid_' + value.color
      }
      process.env.NODE_ENV !== 'production' && invariant(
        value.replace('#', 'rgb:').match(new RegExp(`^\\d+px_solid_${colorRegexStr}$`, 'i')),
        'border', value, `should be an object with 'width' & 'color' or a string of the form 'width_style_color'`,
      )
      return 'bo_' + value.toLowerCase().replace('#', 'rgb:')

    ////////////////////////////////////

    case 'background':
      process.env.NODE_ENV !== 'production' && invariant(
        typeof value === 'string'
        && (includes(value, backgroundOptions) || value.replace('#', 'rgb:').match(colorRegex)),
        'background', value, `${shouldBeOneOf(backgroundOptions)} or a color`,
      )
      return 'b_' + value.replace('#', 'rgb:')

    ////////////////////////////////////

    case 'overlay':
      return 'l_' + (typeof value === 'string'
          ? value
          : `text:${value.publicId || compileStringStyle(value)}:${encodeURIComponent(value.text)}`
      )

    ////////////////////////////////////

    case 'underlay':
      return 'u_' + value

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
        throw new Error(`Cloudinary Image :: unknown transform parameter provided: ${parameter}`)
      }
  }
}

// http://cloudinary.com/documentation/image_transformations#adding_text_captions
function compileStringStyle(string) {
  const {
    fontFamily, fontSize, fontWeight, fontStyle, textDecoration,
    textAlign, stroke, letterSpacing, lineSpacing
  } = string

  if (process.env.NODE_ENV !== 'production') {
    invariant(
      string, fontFamily && fontSize && typeof fontSize === 'number',
      '', 'text overlay style requires a fontFamily and fontSize',
      '/image_transformations#adding_text_captions',
    )
    if (
      (fontWeight && !['normal', 'bold'].includes(fontWeight)) ||
      (fontStyle && !['normal', 'italic'].includes(fontStyle)) ||
      (textDecoration && !['normal', 'underline', 'strikethrough'].includes(textDecoration)) ||
      (textAlign && !['left', 'center', 'right', 'start', 'end', 'justify'].includes(textAlign)) ||
      (stroke && !['normal', 'stroke'].includes(stroke)) ||
      (letterSpacing && typeof letterSpacing !== 'number') ||
      (lineSpacing && typeof lineSpacing !== 'number')
    ) {
      throw new Error(`Cloudinary :: invalid text overlay style options, received: ${string} - see http://cloudinary.com/documentation/image_transformations#adding_text_captions`)
    }
  }

  return [
    fontFamily, fontSize, fontWeight, fontStyle, textDecoration, textAlign, stroke,
    letterSpacing ? `letter_spacing_${letterSpacing}` : null,
    lineSpacing ? `line_spacing_${lineSpacing}` : null,
  ].filter(o => o).join('_')
}
