import {
  invariantImage as invariant,
  isNumber,
  startsWith,
  includes,
  shouldBeOneOf,
} from '../utils'

// http://cloudinary.com/documentation/image_transformation_reference#format_parameter
const formatOptions = [
  'jpg',
  'jpe',
  'jpeg',
  'jpc',
  'jp2',
  'j2k',
  'wdp',
  'jxr',
  'hdp',
  'png',
  'gif',
  'webp',
  'bmp',
  'tif',
  'tiff',
  'ico',
  'pdf',
  'ps',
  'ept',
  'eps',
  'eps3',
  'psd',
  'svg',
  'ai',
  'djvu',
  'flif',
]

// http://cloudinary.com/documentation/image_transformation_reference#crop_parameter
const cropOptions = [
  'scale',
  'fit',
  'limit',
  'mfit',
  'fill',
  'lfill',
  'pad',
  'lpad',
  'mpad',
  'crop',
  'thumb',
  'imagga_crop',
  'imagga_scale',
]

// http://cloudinary.com/documentation/image_transformation_reference#gravity_parameter
const gravityOptions = [
  'north_west',
  'north',
  'north_east',
  'west',
  'center',
  'east',
  'south_west',
  'south',
  'south_east',
  'xy_center',
  'face',
  'face:center',
  'face:auto',
  'faces',
  'faces:center',
  'faces:auto',
  'body',
  'body:face',
  'ocr_text',
  'adv_face',
  'adv_faces',
  'adv_eyes',
  'custom',
  'custom:face',
  'custom:faces',
  'custom:adv_face',
  'custom:adv_faces',
]

// http://cloudinary.com/documentation/image_transformation_reference#quality_parameter
const qualityOptions = ['auto', 'auto:best', 'auto:good', 'auto:eco', 'auto:low', 'jpegmini']

// http://cloudinary.com/documentation/image_transformation_reference#angle_parameter
const angleOptions = ['auto_right', 'auto_left', 'ignore', 'vflip', 'hflip']

// http://cloudinary.com/documentation/image_transformation_reference#background_parameter
const backgroundOptions = [
  'auto:border',
  'auto:predominant',
  'auto:border_contrast',
  'auto:predominant_contrast',
]

// http://cloudinary.com/documentation/image_transformation_reference#color_parameter
// A color name or rgb: followed by an rgb[a] or rrggbb[aa] hex value
const colorRegex = /^(?:[a-z]+$|rgb:(?:[0-9a-f]{3,4}$|[0-9a-f]{6}$|[0-9a-f]{8}$))/i

// http://cloudinary.com/documentation/image_transformation_reference#color_space_parameter
const colorSpaceOptions = ['srgb', 'tinysrgb', 'no_cmyk']

const flagOptions = [
  'any_format',
  'attachment',
  'apng',
  'awebp',
  'clip',
  'clip_evenodd',
  'cutter',
  'force_strip',
  'ignore_aspect_ratio',
  'immutable_cache',
  'keep_attribution',
  'keep_iptc',
  'layer_apply',
  'lossy',
  'no_overflow',
  'preserve_transparency',
  'png8',
  'png24',
  'png32',
  'progressive',
  'progressive:semi',
  'progressive:steep',
  'progressive:none',
  'rasterize',
  'region_relative',
  'relative',
  'strip_profile',
  'text_no_trim',
  'tiff8_lwz',
  'tiled',
]

const validate = {
  width: value =>
    invariant(
      isNumber(value) || value === 'auto' || startsWith('auto:', value),
      'width',
      value,
      `should be a number, 'auto', or a string starting with 'auto:'`,
    ),
  height: value => invariant(isNumber(value), 'height', value, 'should be a number'),
  crop: value => invariant(includes(value, cropOptions), 'crop', value, shouldBeOneOf(cropOptions)),
  aspectRatio: value =>
    invariant(
      isNumber(value) || value.match(/^\d+:\d+$/),
      'aspectRatio',
      value,
      'should be a number or have the form x:y',
    ),
  gravity: value =>
    invariant(
      includes(value, gravityOptions) || value === 'auto' || startsWith('auto:', value),
      'gravity',
      value,
      `${shouldBeOneOf(gravityOptions)}, 'auto', or a string starting with 'auto:'`,
    ),
  zoom: value => invariant(isNumber(value), 'zoom', value, 'should be a number'),
  x: value => invariant(isNumber(value), 'x', value, 'should be a number'),
  y: value => invariant(isNumber(value), 'y', value, 'should be a number'),
  fetchFormat: value =>
    invariant(
      includes(value, ['auto', ...formatOptions]),
      'fetchFormat',
      value,
      `${shouldBeOneOf(['auto', ...formatOptions])} or 'auto'`,
    ),
  quality: value =>
    invariant(
      (isNumber(value) && 1 <= +value && +value <= 100) ||
        (typeof value === 'string' && value.match(/^\d+:\d+$/)) ||
        includes(value, qualityOptions),
      'quality',
      value,
      `${shouldBeOneOf(formatOptions)}, a number between 1 and 100, or have the form x:y`,
    ),
  radius: value =>
    invariant(
      isNumber(value) || value === 'max' || value.match(/^\d+(?::\d+){0,3}$/),
      'radius',
      value,
      `should be a number, 'max' or have the form x[:y[:z[:u]]]`,
    ),
  angle: value =>
    invariant(
      isNumber(value) || includes(value, angleOptions),
      'angle',
      value,
      `${shouldBeOneOf(angleOptions)} or a number`,
    ),
  effect: value => {},
  opacity: value =>
    invariant(
      isNumber(value) && 0 <= +value && +value <= 100,
      'opacity',
      value,
      'should be a number between 0 and 100',
    ),
  border: value =>
    invariant(
      value.match(new RegExp(`^\\d+px_solid_${colorRegex.toString().replace(/[/^i]/g, '')}$`, 'i')),
      'border',
      value,
      `should be an object with 'width' & 'color' or a string of the form 'width_style_color'`,
    ),
  borderObjectColor: value =>
    invariant(
      'color' in value,
      'border',
      JSON.stringify(value),
      `should contain a 'color' property when provided as an object`,
    ),
  background: value =>
    invariant(
      typeof value === 'string' && (includes(value, backgroundOptions) || value.match(colorRegex)),
      'background',
      value,
      `${shouldBeOneOf(backgroundOptions)} or a color`,
    ),
  overlay: value => {},
  underlay: value => {},
  textCaptionStyles: value => {
    const {
      fontFamily,
      fontSize,
      fontWeight,
      fontStyle,
      textDecoration,
      textAlign,
      stroke,
      letterSpacing,
      lineSpacing,
    } = value
    invariant(
      fontFamily && fontSize && isNumber(fontSize),
      'text caption',
      JSON.stringify(value),
      `required options are 'fontFamily' and 'fontSize'`,
      '/image_transformations#adding_text_captions',
    )
    invariant(
      (!fontWeight || includes(fontWeight, ['normal', 'bold'])) &&
        (!fontStyle || includes(fontStyle, ['normal', 'italic'])) &&
        (!textDecoration || includes(textDecoration, ['none', 'underline', 'strikethrough'])) &&
        (!textAlign ||
          includes(textAlign, ['left', 'center', 'right', 'start', 'end', 'justify'])) &&
        (!stroke || includes(stroke, ['none', 'stroke'])) &&
        (!letterSpacing || isNumber(letterSpacing)) &&
        (!lineSpacing || isNumber(lineSpacing)),
      'text caption',
      JSON.stringify(value),
      `options are invalid`,
      '/image_transformations#adding_text_captions',
    )
  },
  defaultImage: value =>
    invariant(
      value.match(/^[\w+-]+\.[\w]{3,4}$/) &&
        includes(value.substr(value.indexOf('.') + 1), formatOptions),
      'defaultImage',
      value,
      `must include a file extension which ${shouldBeOneOf(formatOptions)}`,
    ),
  delay: value =>
    invariant(isNumber(value) && value >= 0, 'delay', value, `must be a positive number`),
  color: value =>
    invariant(
      value.match(colorRegex),
      'color',
      value,
      `must be a named color, short #rgb[a] or long #rrggbb[aa] hex value`,
    ),
  colorSpace: value =>
    invariant(
      includes(value, colorSpaceOptions) || value.match(/^icc:[\w+-]+\.[\w]{3,4}$/),
      'colorSpace',
      value,
      `${shouldBeOneOf(colorSpaceOptions)} or 'icc:(public_id)'`,
    ),
  dpr: value =>
    invariant(
      value === 'auto' || (isNumber(value) && value > 0),
      'dpr',
      value,
      'should be `auto` or a number greater than 0',
    ),
  page: value =>
    invariant(isNumber(value) && value > 0, 'page', value, 'should be an integer greater than 0'),
  density: value =>
    invariant(
      isNumber(value) && 0 < value && value <= 300,
      'density',
      value,
      'should be a number greater than 0 up to 300',
    ),
  flags: value =>
    invariant(
      value.split('.').every(flag => includes(flag, flagOptions)),
      'flags',
      JSON.stringify(value),
      `${shouldBeOneOf(flagOptions)}, an array of options or '.' separated options`,
    ),
}

const urlParameters = {
  width: 'w_',
  height: 'h_',
  crop: 'c_',
  aspectRatio: 'ar_',
  gravity: 'g_',
  zoom: 'z_',
  x: 'x_',
  y: 'y_',
  fetchFormat: 'f_',
  quality: 'q_',
  radius: 'r_',
  angle: 'a_',
  effect: 'e_',
  opacity: 'o_',
  border: 'bo_',
  background: 'b_',
  overlay: 'l_',
  underlay: 'u_',
  defaultImage: 'd_',
  delay: 'dl_',
  color: 'co_',
  colorSpace: 'cs_',
  dpr: 'dpr_',
  page: 'pg_',
  density: 'dn_',
  flags: 'fl_',
}

export default function compileImageParameter(parameter, value) {
  if (value === null) {
    return false
  }

  switch (parameter) {
    case 'flags':
      value = Array.isArray(value) ? value.join('.') : value
      break

    case 'overlay':
    case 'underlay':
      if (typeof value === 'object') {
        let stringStyle = value.publicId
        if (!stringStyle) {
          if (process.env.NODE_ENV !== 'production') {
            validate.textCaptionStyles(value)
          }
          const { letterSpacing, lineSpacing } = value
          stringStyle = [
            encodeURIComponent(value.fontFamily),
            value.fontSize,
            value.fontWeight,
            value.fontStyle,
            value.textDecoration,
            value.textAlign,
            value.stroke,
            letterSpacing ? `letter_spacing_${letterSpacing}` : 0,
            lineSpacing ? `line_spacing_${lineSpacing}` : 0,
          ]
            .filter(option => option && option !== 'normal' && option !== 'none')
            .join('_')
        }
        value = `text:${stringStyle}:${encodeURIComponent(value.text)}`
      }
      break

    case 'border':
      if (typeof value === 'object') {
        if (process.env.NODE_ENV !== 'production') {
          validate.borderObjectColor(value)
        }
        if (
          typeof value.width !== 'string' ||
          value.width.substr(value.width.length - 2, 2) !== 'px'
        ) {
          value.width = (value.width || 1) + 'px'
        }
        value = value.width + '_solid_' + value.color
      }
      value = value.toLowerCase()
    // falls through

    case 'color':
    case 'background':
      value = value.replace('#', 'rgb:')

    // no default
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!validate[parameter]) {
      throw new Error(`Cloudinary Image :: unknown transform parameter provided: '${parameter}'`)
    }
    validate[parameter](value)
  }

  return urlParameters[parameter] + value
}
