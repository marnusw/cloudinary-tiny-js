# Cloudinary Tiny JS

[Cloudinary](http://cloudinary.com/) is a cloud service that offers a solution to a web application's entire image
management pipeline. For client-side image management Cloudinary provides the `cloudinary-core` library for conveniently
compiling transform options to asset URLs. The problem is that it's a _massive library_ often used to simply convert an
object of properties to a string.

`cloudinary-tiny-js` provides the same commonly used image transformation features at a fraction of the size and without
any dependencies.

Video transformations are not currently supported nor are some advanced configuration options. It 
may also fall short on some advanced image transformations. If you need this functionality, please 
submit PRs with references to the relevant Cloudinary documentation.

## Usage

### Basic configuration

The default export is a configuration function returning another function for building Cloudinary 
URLs. Configuration option names follow the documentation on
[Transforming media assets using dynamic URLs](https://cloudinary.com/documentation/image_transformations#transforming_media_assets_using_dynamic_urls)
and [Private CDNs and CNAMEs](https://cloudinary.com/documentation/advanced_url_delivery_options#private_cdns_and_cnames)
. Only the `cloudName` is required. Defaults are shown below.

```javascript
import cloudinary from 'cloudinary-tiny-js'

const cl = cloudinary({
  /** The name of your Cloudinary account, a unique public identifier for URL building and API access. */
  cloudName: 'demo',
  /**
   * The type of asset to deliver, `image` by default. Valid values: `image`, `raw`, or `video`.
   * Only the `image` type currently supports transforms.
   */
  assetType: 'image',
  /**
   * The storage or delivery type. Default: upload. For details on all possible types, see the
   * Cloudinary docs on delivery types.
   */
  deliveryType: 'upload',
  /** Use https instead of http */
  secure: true,
  /** Override the subdomain when using a private CDN distribution. */
  cdnSubdomain: 'res',
  /** A fully customisable CNAME. */
  cname: 'res.cloudinary.com',
  /** Transforms applied to all images, any transforms passed later will extend these defaults. */
  imageTransformDefaults: { quality: 'auto' /* Any valid transforms, see below */ },
})

const imageUrl = cl('sample.png', { width: 150 })
expect(imageUrl).toBe('https://res.cloudinary.com/demo/image/upload/q_auto,w_150/sample.png')
```

### Image transformations

All image transformations documented in the
[Transformation URL API reference](https://cloudinary.com/documentation/transformation_reference)
are supported except for arithmetic operators, conditionals and variables.

To create a resource URL, call the function returned by the configuration function with a public ID and optional image
transformation options:

```javascript
const basicUrl = cl('sample.png')
expect(basicUrl).toBe('https://res.cloudinary.com/demo/image/upload/v1/sample.png')

const resizedUrl = cl('sample.png', { width: 150, height: 100 })
expect(resizedUrl).toBe('https://res.cloudinary.com/demo/image/upload/w_150,h_100/v1/sample.png')
```

Other options that can be provided alongside transform options are:

```javascript
const url = cl('http://example.com/sample.dat', {
  /**
   * Specify a single or multiple transformations to apply. The options of a single transform can also
   * be included directly on this parent object. Note that the default transforms are only applied
   * when a single transform is provided and not for an array of transforms.
   */
  transformations: undefined,
  /**
   * Override the `assetType` provided in the configuration.
   */
  assetType: 'raw',
  /**
   * Override the `deliveryType` provided in the configuration.
   */
  deliveryType: 'fetch',
  /**
   * You can add the version to your delivery URL to bypass the cached version on the CDN and
   * force delivery of the latest resource. As an alternative to using versions, you can set the
   * `invalidate` parameter to true while uploading a new image in order to invalidate the
   * previous image throughout the CDN.
   */
  version: 742,
})
expect(url).toBe('http://res.cloudinary.com/demo/raw/fetch/v742/http://example.com/sample.dat')
```

To perform multiple transformations an array of transform objects can be passed; the array can be passed directly as the
second parameter or on the `transformations` property along with other options.

This will generate the URL of the first example in the
[Image transformation reference](http://cloudinary.com/documentation/image_transformation_reference):

```javascript
const transformations = [
  { width: 220, height: 140, crop: 'fill' },
  { overlay: 'brown_sheep', width: 220, height: 140, x: 220, crop: 'fill' },
  { overlay: 'horses', width: 220, height: 140, x: -110, y: 140, crop: 'fill' },
  { overlay: 'white_chicken', width: 220, height: 140, x: 110, y: 70, crop: 'fill' },
  { overlay: 'butterfly.png', height: 200, x: -10, angle: 10 },
  { width: 400, height: 260, radius: 20, crop: 'crop' },
  { overlay: 'text:Parisienne_35_bold:Memories%20from%20our%20trip', color: '#990C47', y: 155 },
  { effect: 'shadow' },
]

const url = cl('yellow_tulip.jpg', transformations)

// Or with other options
const url = cl('yellow_tulip.jpg', {
  version: 423,
  transformations,
})
```

### Specifying default image transformations

The `imageTransformDefaults` property provides a convenient way to include certain transform options in all image
transforms. For example, specifying auto format, quality and width for all images can be achieved by passing:

```javascript
const cl = cloudinary({
  cloudName: 'demo',
  imageTransformDefaults: {
    format: 'auto',
    quality: 'auto',
    width: 'auto',
  },
})

const imageUrl = cl('sample.png', { aspectRatio: '16:9' })
expect(imageUrl).toBe('https://res.cloudina.../f_auto,q_auto,w_auto,ar_16:9/v1/sample.png')
```

Override any default value by passing a replacement value or remove it from the URL by passing `undefined`:

```javascript
const cl = cloudinary({
  cloudName: 'demo',
  imageTransformDefaults: {
    format: 'auto',
    quality: 'auto',
    width: 'auto',
  },
})

const imageUrl = cl('sample.png', { aspectRatio: '16:9', width: 150, quality: undefined })
expect(imageUrl).toBe('https://res.cloudina.../f_auto,ar_16:9,w_150/v1/sample.png')
```

### Transformation parameter validation

Typings should help to provide valid parameter values in most cases, but errors will also be thrown on invalid parameter
values in development, for example:

```javascript
cl('sample.jpg', { radius: 'round' })
// Throws:
// Cloudinary Image :: radius should be a number, 'max' or have the form x[:y[:z[:u]]], received: 'round'
```

Some exceptions are the `effect`, `overlay` and `underlay` values which are not validated.

### Building for production

When building for production ensure `process.env.NODE_ENV === 'production'` so the validation logic can be removed from
the bundle during minification.

## Contributing

The most important configuration and image transformation features of Cloudinary should be supported, but if anything is
missing please submit issues or PRs with references to the relevant Cloudinary documentation.

## License

MIT
