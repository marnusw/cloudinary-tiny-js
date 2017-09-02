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
const rgb = 'rgb:'

// http://cloudinary.com/documentation/image_transformation_reference#color_space_parameter
const colorSpaceOptions = ['srgb', 'tinysrgb', 'no_cmyk']

const flagOptions = [
  'any_format', 'attachment', 'apng', 'awebp', 'clip', 'clip_evenodd', 'cutter', 'force_strip', 'ignore_aspect_ratio',
  'immutable_cache', 'keep_attribution', 'keep_iptc', 'layer_apply', 'lossy', 'no_overflow', 'preserve_transparency',
  'png8', 'png24', 'png32', 'progressive', 'progressive:semi', 'progressive:steep', 'progressive:none', 'rasterize',
  'region_relative', 'relative', 'strip_profile', 'text_no_trim', 'tiff8_lwz', 'tiled',
]


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

export function compileParameter(parameter, value) {
  switch (parameter) {

    case 'width':
      process.env.NODE_ENV !== 'production' && invariant(
        isNumber(value) || value === 'auto' || startsWith('auto:', value),
        'width', value, `should be a number, 'auto', or a string starting with 'auto:'`,
      )
      return 'w_' + value

    ////////////////////////////////////

    case 'height':
      process.env.NODE_ENV !== 'production' && invariant(
        isNumber(value), 'height', value, 'should be a number',
      )
      return 'h_' + value

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

    case 'zoom':
      process.env.NODE_ENV !== 'production' && invariant(
        isNumber(value), 'zoom', value, 'should be a number',
      )
      return 'z_' + value

    ////////////////////////////////////

    case 'x':
      process.env.NODE_ENV !== 'production' && invariant(
        isNumber(value), 'x', value, 'should be a number',
      )
      return 'x_' + value

    ////////////////////////////////////

    case 'y':
      process.env.NODE_ENV !== 'production' && invariant(
        isNumber(value), 'y', value, 'should be a number',
      )
      return 'y_' + value

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
        value
          .replace('#', rgb)
          .match(new RegExp(`^\\d+px_solid_${colorRegex.toString().replace(/[/^i]/g, '')}$`, 'i')),
        'border', value, `should be an object with 'width' & 'color' or a string of the form 'width_style_color'`,
      )
      return 'bo_' + value.toLowerCase().replace('#', rgb)

    ////////////////////////////////////

    case 'background':
      process.env.NODE_ENV !== 'production' && invariant(
        typeof value === 'string'
        && (includes(value, backgroundOptions) || value.replace('#', rgb).match(colorRegex)),
        'background', value, `${shouldBeOneOf(backgroundOptions)} or a color`,
      )
      return 'b_' + value.replace('#', rgb)

    ////////////////////////////////////

    case 'overlay':
      return 'l_' + compileOverlay(value)

    ////////////////////////////////////

    case 'underlay':
      return 'u_' + compileOverlay(value)

    ////////////////////////////////////

    case 'defaultImage':
      process.env.NODE_ENV !== 'production' && invariant(
        value.match(/^[\w+-]+\.[\w]{3,4}$/) && includes(value.substr(value.indexOf('.') + 1), formatOptions),
        'defaultImage', value, `must include a file extension which ${shouldBeOneOf(formatOptions)}`,
      )
      return 'd_' + value

    ////////////////////////////////////

    case 'delay':
      process.env.NODE_ENV !== 'production' && invariant(
        isNumber(value) && value >= 0,
        'delay', value, `must be a positive number`,
      )
      return 'dl_' + value

    ////////////////////////////////////

    case 'color':
      process.env.NODE_ENV !== 'production' && invariant(
        value.replace('#', rgb).match(colorRegex),
        'color', value, `must be a named color, short #rgb[a] or long #rrggbb[aa] hex value`,
      )
      return 'co_' + value.replace('#', rgb)

    ////////////////////////////////////

    case 'colorSpace':
      process.env.NODE_ENV !== 'production' && invariant(
        includes(value, colorSpaceOptions) || value.match(/^icc:[\w+-]+\.[\w]{3,4}$/),
        'colorSpace', value, `${shouldBeOneOf(colorSpaceOptions)} or 'icc:(public_id)'`,
      )
      return 'cs_' + value

    ////////////////////////////////////

    case 'dpr':
      process.env.NODE_ENV !== 'production' && invariant(
        value === 'auto' || (isNumber(value) && value > 0),
        'dpr', value, 'should be `auto` or a number greater than 0',
      )
      return 'dpr_' + value

    ////////////////////////////////////

    case 'page':
      process.env.NODE_ENV !== 'production' && invariant(
        isNumber(value) && value > 0,
        'page', value, 'should be an integer greater than 0',
      )
      return 'pg_' + value

    ////////////////////////////////////

    case 'density':
      process.env.NODE_ENV !== 'production' && invariant(
        isNumber(value) && 0 < value && value <= 300,
        'density', value, 'should be a number greater than 0 up to 300',
      )
      return 'dn_' + value

    ////////////////////////////////////

    case 'flags':
      process.env.NODE_ENV !== 'production' && invariant(
        (Array.isArray(value) ? value : value.split('.')
          .every(flag => includes(flag, flagOptions))),
        'flags', JSON.stringify(value), `${shouldBeOneOf(flagOptions)}, an array of options or '.' separated options`,
      )
      return 'fl_' + (Array.isArray(value) ? value.join('.') : value)

    ////////////////////////////////////

    default:
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(`Cloudinary Image :: unknown transform parameter provided: '${parameter}'`)
      }
  }
}

// http://cloudinary.com/documentation/image_transformation_reference#overlay_parameter
function compileOverlay(value) {
  return typeof value === 'string' ? value : (
    `text:${value.publicId || compileStringStyle(value)}:${encodeURIComponent(value.text)}`
  )
}

// http://cloudinary.com/documentation/image_transformations#adding_text_captions
function compileStringStyle(opts) {
  const {letterSpacing, lineSpacing} = opts

  if (process.env.NODE_ENV !== 'production') {
    const {fontFamily, fontSize, fontWeight, fontStyle, textDecoration, textAlign, stroke} = opts
    invariant(
      fontFamily && fontSize && isNumber(fontSize),
      'text caption', JSON.stringify(opts), `required options are 'fontFamily' and 'fontSize'`,
      '/image_transformations#adding_text_captions',
    )
    invariant(
      (!fontWeight || includes(fontWeight, ['normal', 'bold'])) &&
      (!fontStyle || includes(fontStyle, ['normal', 'italic'])) &&
      (!textDecoration || includes(textDecoration, ['none', 'underline', 'strikethrough'])) &&
      (!textAlign || includes(textAlign, ['left', 'center', 'right', 'start', 'end', 'justify'])) &&
      (!stroke || includes(stroke, ['none', 'stroke'])) &&
      (!letterSpacing || isNumber(letterSpacing)) &&
      (!lineSpacing || isNumber(lineSpacing)),
      'text caption', JSON.stringify(opts), `options are invalid`,
      '/image_transformations#adding_text_captions',
    )
  }

  return [
    encodeURIComponent(opts.fontFamily), opts.fontSize, opts.fontWeight, opts.fontStyle,
    opts.textDecoration, opts.textAlign, opts.stroke,
    letterSpacing ? `letter_spacing_${letterSpacing}` : 0,
    lineSpacing ? `line_spacing_${lineSpacing}` : 0,
  ].filter(option => option && option !== 'normal' && option !== 'none').join('_')
}
