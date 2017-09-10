# Cloudinary Tiny JS

[Cloudinary](http://cloudinary.com/) is a cloud service that offers a solution to 
a web application's entire image management pipeline. For client-side image management 
Cloudinary provides the `cloudinary-core` library for conveniently compiling transform 
options to asset URLs. The problem is that it's a *massive library* often used to 
simply convert an object of properties to a string.

Reviewing the Webpack bundle analyzer plugin output shows that if the `cloudinary-core`
library is unwittingly included with the default `import cloudinary from 'cloudinary-core'`
it includes a bundled copy of `lodash` as well for a combined parsed size of 114 KB and 
38 KB gzipped. The proposed solution is to import `cloudinary-core/cloudinary-core-shrinkwrap`
which does not bundle the entire `lodash` library, but it is still 62 KB and 20 KB gzipped.

`cloudinary-tiny-js` provides the same commonly used image transformation features
at a fraction of the size and without any dependencies: only 3.62 KB and 1.5 KB gzipped. 
That is a 92.5% reduction in size from the shrink-wrapped version.

(Support for video transformations is coming soon)

## Usage

### Installation

```bash
npm install cloudinary-tiny-js
```

### Basic configuration

The default import is a factory function taking 
[configuration options](http://cloudinary.com/documentation/node_additional_topics#configuration_options) 
of which the only required parameter is the `cloudName`. 

```javascript
import cloudinary from 'cloudinary-tiny-js'

const cl = cloudinary({cloudName: 'demo'})

const imageUrl = cl('sample.png', {width: 150})
expect(imageUrl).toBe(
  'https://res.cloudinary.com/demo/image/upload/w_150/v1/sample.png'
)
```

All image transforms documented in the 
[Image transformation reference](http://cloudinary.com/documentation/image_transformation_reference)
are supported except for the last three: arithmetic operators, conditionals and variables. 
(If there is a need for these submit an issue or PR.)

### Advanced configuration

The factory function supports these configuration options and defaults:

```javascript
const cl = cloudinary({
  cloudName: '...', // Required account cloudName
  secure = true,
  cname = 'res.cloudinary.com',
  cdnSubdomain = false,
  defaults: {
    resourceType: 'image',
    type: 'upload',
    ...defaultTransform
  }
})
```

The `secure` option specifies generating `https` URLs instead of `http`; this is on by 
default since most sites use `https` these days; disable globally by passing `false` here, 
or case by case by passing `secure: false` on the transform options.

Use the `cname` option to specify a different CNAME for use with an advanced plan with 
a private CDN distribution and custom CNAME.

`cdnSubdomain` specifies whether to automatically build URLs with multiple CDN sub-domains. 
See [this blog post](http://cloudinary.com/blog/reduce_site_load_time_with_multiple_cdn_sub_domains) 
for more details. The caveat is that public IDs must consistently be hashed to random numbers
between 1 and 5 to assign different sub-domains. `cloudinary-core` uses this  
[CRC32 implementation](http://locutus.io/php/strings/crc32/index.html) which is 7KB all on
its own. For this reason it is not included in this library and if you wish to enable this
feature instead of passing `true` to `cdnSubdomain` you pass your own CRC-type function
`(string) => number`. The modulus 5 of the output will be used to assign a subdomain.

The two remaining options, `private_cdn` and `secure_distribution`, are not currently 
supported since the documentation is not clear on how these are used. If anyone has this
requirement and can describe the proper behaviour feel free to open an issue for it.

### Specifying default transform options

The `defaults` property provides a convenient way to include certain transform options
in all image transforms. For example, specifying auto fetch format, quality and width for
all images can be achieved by passing:

```javascript
const cl = cloudinary({
  cloudName: 'demo',
  defaults: {
    fetchFormat: 'auto',
    quality: 'auto',
    width: 'auto',
  }
})

const imageUrl = cl('sample.png', {aspectRatio: '16:9'})
expect(imageUrl).toBe(
  'https://res.cloudina.../f_auto,q_auto,w_auto,ar_16:9/v1/sample.png'
)
```

Override any default value by passing a replacement value or removed it from the URL by
passing `null`:

```javascript
const cl = cloudinary({
  cloudName: 'demo',
  defaults: {
    fetchFormat: 'auto',
    quality: 'auto',
    width: 'auto',
  }
})

const imageUrl = cl('sample.png', {aspectRatio: '16:9', width: 150, quality: null})
expect(imageUrl).toBe(
  'https://res.cloudina.../f_auto,ar_16:9,w_150/v1/sample.png'
)
```

If primarily raw resource URLs will be generated or if most images would be, for example,
fetched from Facebook the default `resourceType` and `type` property defaults can also be
overridden for convenience:

```javascript
const clRaw = cloudinary({cloudName: 'demo', defaults: {resourceType: 'raw'})
const clFb = cloudinary({cloudName: 'demo', defaults: {type: 'facebook'})
``` 

### Image transformations

All image transforms documented in the 
[Image transformation reference](http://cloudinary.com/documentation/image_transformation_reference)
are supported except for the last three: arithmetic operators, conditionals and variables. 
(If there is a need for these submit an issue or PR.)

To create a resource URL call the function returned by the factory function with a public ID
and optional transform options:

```javascript
const basicUrl = cl('sample.png')
expect(basicUrl).toBe(
  'https://res.cloudinary.com/demo/image/upload/v1/sample.png'
)

const resizedUrl = cl('sample.png', {width: 150, height: 100})
expect(resizedUrl).toBe(
  'https://res.cloudinary.com/demo/image/upload/w_150,h_100/v1/sample.png'
)
```

Other options that can be provided alongside transform options are:

```javascript
const url = cl('http://example.com/sample.dat', {
  resourceType: 'raw', // Supported resource types are 'raw', 'image' (default) and 'video' (coming soon)
  type: 'fetch',       // Set the `type` portion of the URL
  secure: false,       // Override the configured `secure` option on this particular URL
  version: 742,        // Provide a version number to use other than the default 1
})
expect(url).toBe(
  'http://res.cloudinary.com/demo/raw/fetch/v742/http://example.com/sample.dat'
)
```

To perform multiple transformations an array of transform objects can be passed; the
array can be passed directly as the second parameter or on the `transform` property if other
options are to be provided.

This will generate the URL of the first example in the 
[Image transformation reference](http://cloudinary.com/documentation/image_transformation_reference):

```javascript
const url = cl('yellow_tulip.jpg', [
  {width: 220, height: 140, crop: 'fill'},
  {overlay: 'brown_sheep', width: 220, height: 140, x: 220, crop: 'fill'},
  {overlay: 'horses', width: 220, height: 140, x: -110, y: 140, crop: 'fill'},
  {overlay: 'white_chicken', width: 220, height: 140, x: 110, y: 70, crop: 'fill'},
  {overlay: 'butterfly.png', height: 200, x: -10, angle: 10},
  {width: 400, height: 260, radius: 20, crop: 'crop'},
  {overlay: 'text:Parisienne_35_bold:Memories%20from%20our%20trip', color: '#990C47', y: 155},
  {effect: 'shadow'}
])

// Or with other options
const url = cl('yellow_tulip.jpg', {
  secure: false,
  transform: [/* Same options as above here */],
})
```

### Transformation parameter validation

The library attempts to be helpful in catching invalid parameter values by providing 
insightful errors, for example:

```javascript
cl('sample.jpg', {radius: 'round'})
// Throws:
// Cloudinary Image :: radius should be a number, 'max' or have the form x[:y[:z[:u]]], received: 'round'
```

The exception is the `effect` transform which already has numerous options with more added
regularly.

### Building for production

When building for production it is important to do so with 
`process.env.NODE_ENV === 'production'` so the validation logic can be stripped from the 
bundle upon minification.


## Contributing

The most important configuration and image transformation features of Cloudinary should 
be supported, but if anything is missing please point it out with an issue or contribute 
the feature.

PRs are welcome.


## License

Free to use under the MIT license.
