# Cloudinary Tiny JS

[Cloudinary](http://cloudinary.com/) is a cloud service that offers a solution to 
a web application's entire image management pipeline.

For client-side image management Cloudinary provides the `cloudinary-core` library for 
conveniently compiling transform options to asset URLs. The problem is that it's a 
**massive library** often used to simply convert an object of properties to a string.

The Webpack bundle analyzer plugin output is shown below. If the `cloudinary-core`
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
If there is a need for these please submit an issue or PR.


## Contributing

PRs are welcome.


## License

Free to use under the MIT license.
