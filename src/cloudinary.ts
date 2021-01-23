import { compileImageTransforms } from './transforms/imageTransforms'
import { ImageTransform } from './transforms/imageTransformTypes'

export type AssetType = 'image' | 'video' | 'raw' | 'auto'

export type DeliveryType = 'upload' | 'fetch' | 'facebook' | 'twitter' | 'twitter_name' | 'gravatar'

export interface CloudinaryConfiguration {
  /** The name of your Cloudinary account, a unique public identifier for URL building and API access. */
  cloudName: string
  /**
   * The type of asset to deliver, `image` by default. Valid values: `image`, `raw`, or `video`.
   * Only the `image` type currently supports transforms.
   */
  assetType?: AssetType
  /**
   * The storage or delivery type. Default: upload. For details on all possible types, see the
   * Cloudinary docs on delivery types.
   */
  deliveryType?: DeliveryType
  /** Use https, `true` by default. */
  secure?: boolean
  /** A custom subdomain, other than `res`. */
  cdnSubdomain?: string
  /** A custom host name, other than `cloudinary.com`. */
  cname?: string
  /** Any transforms passed later will extend these defaults. */
  imageTransformDefaults?: ImageTransform
}

export interface ImageTransformOptions extends ImageTransform {
  /** Specify a single or multiple transforms to apply. The options of a single transform can also
   * be included directly on the parent object. **Note that the default transforms are only applied
   * when a single transform is provided.** */
  transformations?: ImageTransform | ImageTransform[]
  /**
   * Override the `assetType` provided in the configuration.
   */
  assetType?: AssetType
  /**
   * Override the `deliveryType` provided in the configuration.
   */
  deliveryType?: DeliveryType
  /**
   * You can add the version to your delivery URL to bypass the cached version on the CDN and
   * force delivery of the latest resource. As an alternative to using versions, you can set the
   * `invalidate` parameter to true while uploading a new image in order to invalidate the
   * previous image throughout the CDN.
   */
  version?: string | number
}

const cloudinary = ({
  cloudName,
  assetType: assetTypeDefault = 'image',
  deliveryType: deliveryTypeDefault = 'upload',
  secure = true,
  cdnSubdomain = 'res',
  cname = 'cloudinary.com',
  imageTransformDefaults: defaultTransform,
}: CloudinaryConfiguration) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!cloudName) {
      throw new Error('Cloudinary configuration requires a `cloudName` option.')
    }
  }

  const baseUrl = `http${secure ? 's' : ''}://${cdnSubdomain}.${cname}/${cloudName}/`

  return (publicId: string, options?: ImageTransformOptions | ImageTransform[]) => {
    if (Array.isArray(options)) {
      options = { transformations: options }
    }

    let {
      deliveryType = deliveryTypeDefault,
      assetType = assetTypeDefault,
      version = '',
      transformations,
      ...rest
    } = options ?? {}

    if (version) {
      version = `/${version.toString().startsWith('v') ? version : 'v' + version}`
    }

    const transformation =
      assetType === 'image' ? compileImageTransforms(transformations ?? rest, defaultTransform) : ''

    return `${baseUrl}${assetType}/${deliveryType}${transformation}${version}/${publicId}`
  }
}

export default cloudinary
