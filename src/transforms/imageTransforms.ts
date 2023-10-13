import { BorderObject, ImageTransform, StringOverlayStyle } from './imageTransformTypes'
import {
  includes,
  invariantImage as invariant,
  isNumber,
  shouldBeOneOf,
  startsWith,
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

// Undefined or null values are filtered before validation
type ImgOpt = Required<ImageTransform>

type Validators = { [Key in keyof ImgOpt]: (value: ImgOpt[Key]) => void } & {
  borderObjectColor: (value: BorderObject) => void
} & { textCaptionStyles: (value: StringOverlayStyle) => void }

const validate: Validators = {
  width: (value: ImgOpt['width']) =>
    invariant(
      isNumber(value) || (typeof value === 'string' && value.match(/^iw$|^auto(?:$|(?::.+))/)),
      'width',
      value,
      `should be a number, 'auto', or a string starting with 'auto:'`,
    ),
  height: (value: ImgOpt['height']) =>
    invariant(
      isNumber(value) || (typeof value === 'string' && value === 'ih'),
      'height',
      value,
      `should be a number or 'ih'`,
    ),
  crop: (value: ImgOpt['crop']) =>
    invariant(value && includes(value, cropOptions), 'crop', value, shouldBeOneOf(cropOptions)),
  aspectRatio: (value: ImgOpt['aspectRatio']) =>
    invariant(
      isNumber(value) || (typeof value === 'string' && value.match(/^\d+:\d+$/)),
      'aspectRatio',
      value,
      'should be a number or have the form x:y',
    ),
  gravity: (value: ImgOpt['gravity']) =>
    invariant(
      includes(value, gravityOptions) || value === 'auto' || startsWith('auto:', value),
      'gravity',
      value,
      `${shouldBeOneOf(gravityOptions)}, 'auto', or a string starting with 'auto:'`,
    ),
  zoom: (value: ImgOpt['zoom']) => invariant(isNumber(value), 'zoom', value, 'should be a number'),
  x: (value: ImgOpt['x']) => invariant(isNumber(value), 'x', value, 'should be a number'),
  y: (value: ImgOpt['y']) => invariant(isNumber(value), 'y', value, 'should be a number'),
  format: (value: ImgOpt['fetchFormat']) =>
    invariant(
      includes(value, ['auto', ...formatOptions]),
      'fetchFormat',
      value,
      `${shouldBeOneOf(['auto', ...formatOptions])} or 'auto'`,
    ),
  fetchFormat(value: ImgOpt['fetchFormat']) {
    this.format(value)
  },
  quality: (value: ImgOpt['quality']) =>
    invariant(
      (isNumber(value) && 1 <= +value && +value <= 100) ||
        (typeof value === 'string' &&
          (value.match(/^\d+:\d+$/) || includes(value, qualityOptions))),
      'quality',
      value,
      `${shouldBeOneOf(formatOptions)}, a number between 1 and 100, or have the form x:y`,
    ),
  radius: (value: ImgOpt['radius']) =>
    invariant(
      isNumber(value) ||
        value === 'max' ||
        (typeof value === 'string' && value.match(/^\d+(?::\d+){0,3}$/)),
      'radius',
      value,
      `should be a number, 'max' or have the form x[:y[:z[:u]]]`,
    ),
  angle: (value: ImgOpt['angle']) =>
    invariant(
      isNumber(value) || (typeof value === 'string' && includes(value, angleOptions)),
      'angle',
      value,
      `${shouldBeOneOf(angleOptions)} or a number`,
    ),
  effect: () => {
    // No validation
  },
  opacity: (value: ImgOpt['opacity']) =>
    invariant(
      isNumber(value) && 0 <= +value && +value <= 100,
      'opacity',
      value,
      'should be a number between 0 and 100',
    ),
  border: (value: ImgOpt['border']) =>
    invariant(
      typeof value === 'string' &&
        value.match(
          new RegExp(`^\\d+px_solid_${colorRegex.toString().replace(/[/^i]/g, '')}$`, 'i'),
        ),
      'border',
      value,
      `should be an object with 'width' & 'color' or a string of the form 'width_style_color'`,
    ),
  borderObjectColor: (value: BorderObject) =>
    invariant(
      'color' in value,
      'border',
      JSON.stringify(value),
      `should contain a 'color' property when provided as an object`,
    ),
  background: (value: ImgOpt['background']) =>
    invariant(
      includes(value, backgroundOptions) || value.match(colorRegex),
      'background',
      value,
      `${shouldBeOneOf(backgroundOptions)} or a color`,
    ),
  overlay: () => {
    // No validation
  },
  underlay: () => {
    // No validation
  },
  textCaptionStyles: (value: StringOverlayStyle) => {
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
  defaultImage: (value: ImgOpt['defaultImage']) =>
    invariant(
      value.match(/^[\w+-]+\.[\w]{3,4}$/) &&
        includes(value.substr(value.indexOf('.') + 1), formatOptions),
      'defaultImage',
      value,
      `must include a file extension which ${shouldBeOneOf(formatOptions)}`,
    ),
  delay: (value: ImgOpt['delay']) =>
    invariant(isNumber(value) && value >= 0, 'delay', value, `must be a positive number`),
  color: (value: ImgOpt['color']) =>
    invariant(
      value.match(colorRegex),
      'color',
      value,
      `must be a named color, short #rgb[a] or long #rrggbb[aa] hex value`,
    ),
  colorSpace: (value: ImgOpt['colorSpace']) =>
    invariant(
      includes(value, colorSpaceOptions) || value.match(/^icc:[\w+-]+\.[\w]{3,4}$/),
      'colorSpace',
      value,
      `${shouldBeOneOf(colorSpaceOptions)} or 'icc:(public_id)'`,
    ),
  dpr: (value: ImgOpt['dpr']) =>
    invariant(
      value === 'auto' || (isNumber(value) && value > 0),
      'dpr',
      value,
      'should be `auto` or a number greater than 0',
    ),
  page: (value: ImgOpt['page']) =>
    invariant(isNumber(value) && value > 0, 'page', value, 'should be an integer greater than 0'),
  density: (value: ImgOpt['density']) =>
    invariant(
      isNumber(value) && 0 < value && value <= 300,
      'density',
      value,
      'should be a number greater than 0 up to 300',
    ),
  flags: (value: ImgOpt['flags']): asserts value is ImgOpt['flags'] => {
    invariant(
      (Array.isArray(value) ? value : value.split('.')).every((flag) =>
        includes(flag, flagOptions),
      ),
      'flags',
      JSON.stringify(value),
      `${shouldBeOneOf(flagOptions)}, an array of options or '.' separated options`,
    )
  },
}

const urlParameters: Record<keyof ImageTransform, string> = {
  width: 'w_',
  height: 'h_',
  crop: 'c_',
  aspectRatio: 'ar_',
  gravity: 'g_',
  zoom: 'z_',
  x: 'x_',
  y: 'y_',
  fetchFormat: 'f_',
  format: 'f_',
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

const compileTextCaption = (value: StringOverlayStyle): string => {
  let publicIdStringStyle = value.publicId
  if (!publicIdStringStyle) {
    if (process.env.NODE_ENV !== 'production') {
      validate.textCaptionStyles(value)
    }
    const { letterSpacing, lineSpacing } = value
    publicIdStringStyle = [
      value.fontFamily && encodeURIComponent(value.fontFamily),
      value.fontSize,
      value.fontWeight,
      value.fontStyle,
      value.textDecoration,
      value.textAlign,
      value.stroke,
      letterSpacing ? `letter_spacing_${letterSpacing}` : 0,
      lineSpacing ? `line_spacing_${lineSpacing}` : 0,
    ]
      .filter((option) => option && option !== 'normal' && option !== 'none')
      .join('_')
  }
  return `text:${publicIdStringStyle}:${encodeURIComponent(value.text)}`
}

const compileBorder = (value: BorderObject): string => {
  if (process.env.NODE_ENV !== 'production') {
    validate.borderObjectColor(value as BorderObject)
  }
  if (typeof value.width !== 'string' || value.width.substr(value.width.length - 2, 2) !== 'px') {
    value.width = (value.width || 1) + 'px'
  }
  return value.width + '_solid_' + value.color
}

export function compileImageParameter<T extends keyof ImageTransform>(
  parameter: T,
  value: ImageTransform[T] | string,
) {
  if (value == null) {
    return false
  }

  switch (parameter) {
    case 'flags':
      value = Array.isArray(value) ? value.join('.') : value
      break

    case 'overlay':
    case 'underlay':
      if (typeof value === 'object') {
        value = compileTextCaption(value as StringOverlayStyle)
      }
      break

    case 'border':
      if (typeof value === 'object') {
        value = compileBorder(value as BorderObject)
      }
      value = value.toString().toLowerCase().replace('#', 'rgb:')
      break

    case 'color':
    case 'background':
      value = value.toString().replace('#', 'rgb:')

    // no default
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!validate[parameter]) {
      throw new Error(`Cloudinary Image :: unknown transform parameter provided: '${parameter}'`)
    }
    // @ts-ignore
    validate[parameter](value)
  }

  return urlParameters[parameter] + value
}

const compileImageTransform = (transform: ImageTransform) =>
  (Object.keys(transform) as (keyof ImageTransform)[])
    .map((param) => compileImageParameter(param, transform[param]))
    .filter(Boolean)
    .join(',')

export const compileImageTransforms = (
  transform: ImageTransform | ImageTransform[],
  defaultTransform?: ImageTransform,
) => {
  const compiledTransform = Array.isArray(transform)
    ? transform.map(compileImageTransform).join('/')
    : compileImageTransform({ ...defaultTransform, ...transform })

  return compiledTransform ? `/${compiledTransform}` : ''
}
