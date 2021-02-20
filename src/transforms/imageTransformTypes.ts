export type CropMode =
  | 'scale'
  | 'fit'
  | 'limit'
  | 'mfit'
  | 'fill'
  | 'lfill'
  | 'pad'
  | 'lpad'
  | 'mpad'
  | 'crop'
  | 'thumb'
  | 'imagga_crop'
  | 'imagga_scale'

export type Gravity =
  | 'north_west'
  | 'north'
  | 'north_east'
  | 'west'
  | 'center'
  | 'east'
  | 'south_west'
  | 'south'
  | 'south_east'
  | 'xy_center'
  | 'face'
  | 'face:center'
  | 'face:auto'
  | 'faces'
  | 'faces:center'
  | 'faces:auto'
  | 'body'
  | 'body:face'
  | 'adv_face'
  | 'adv_faces'
  | 'adv_eyes'
  | 'custom'
  | 'custom:face'
  | 'custom:faces'
  | 'custom:adv_face'
  | 'custom:adv_faces'
  | 'auto'
  | 'auto:adv_face'
  | 'auto:adv_faces'
  | 'auto:adv_eyes'
  | 'auto:body'
  | 'auto:face'
  | 'auto:faces'
  | 'auto:custom_no_override'
  | 'auto:none'

export type ImageFileExtension =
  | 'jpg'
  | 'jpe'
  | 'jpeg'
  | 'jpc'
  | 'jp2'
  | 'j2k'
  | 'wdp'
  | 'jxr'
  | 'hdp'
  | 'png'
  | 'gif'
  | 'webp'
  | 'bmp'
  | 'tif'
  | 'tiff'
  | 'ico'
  | 'pdf'
  | 'ps'
  | 'ept'
  | 'eps'
  | 'eps3'
  | 'psd'
  | 'svg'
  | 'ai'
  | 'djvu'
  | 'flif'

export type Angle = number | 'auto_right' | 'auto_left' | 'ignore' | 'vflip' | 'hflip'

export type ColorSpace = 'srgb' | 'no_cmyk'

type ImageFlag =
  | string // Match future additions
  | 'animated'
  | 'any_format'
  | 'apng'
  | 'attachment'
  | 'awebp'
  | 'clip'
  | 'clip_evenodd'
  | 'cutter'
  | 'force_icc'
  | 'force_strip'
  | 'getinfo'
  | 'hlsv3'
  | 'ignore_aspect_ratio'
  | 'ignore_mask_channels'
  | 'immutable_cache'
  | 'keep_attribution'
  | 'keep_dar'
  | 'keep_iptc'
  | 'layer_apply'
  | 'lossy'
  | 'mono'
  | 'no_overflow'
  | 'no_stream'
  | 'png8'
  | 'png24'
  | 'png32'
  | 'preserve_transparency'
  | 'progressive'
  | 'rasterize'
  | 'region_relative'
  | 'relative'
  | 'replace_image'
  | 'sanitize'
  | 'splice'
  | 'streaming_attachment'
  | 'strip_profile'
  | 'text_disallow_overflow'
  | 'text_no_trim'
  | 'tif8_lzw'
  | 'tiled'
  | 'truncate_ts'
  | 'waveform'
export type ImageFlags = ImageFlag | ImageFlag[]

export interface StringOverlayStyle {
  publicId?: string
  fontFamily?: string
  fontSize?: string | number
  fontWeight?: string
  fontStyle?: string
  textDecoration?: string
  textAlign?: string
  stroke?: string
  letterSpacing?: string | number
  lineSpacing?: string | number
  text: string
}

export interface BorderObject {
  width?: string | number
  color: string
}

export interface ImageTransform {
  angle?: Angle
  aspectRatio?: string | number
  background?: string
  border?: string | BorderObject
  color?: string
  colorSpace?: ColorSpace
  crop?: CropMode
  defaultImage?: string
  delay?: string | number
  density?: number | string
  dpr?: number | string
  effect?: string
  fetchFormat?: ImageFileExtension | 'auto'
  format?: ImageFileExtension | 'auto'
  flags?: ImageFlags | string
  gravity?: Gravity
  height?: number | string
  opacity?: number | string
  overlay?: string | StringOverlayStyle
  page?: number | string
  quality?: number | string | 'auto'
  radius?: number | string
  underlay?: string | StringOverlayStyle
  width?: string | number
  x?: number | string
  y?: number | string
  zoom?: number | string
}
