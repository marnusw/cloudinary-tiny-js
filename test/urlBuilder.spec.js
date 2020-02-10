import urlBuilder, { compile } from '../src/urlBuilder'
import imageParameters from '../src/parameters/image'

describe('urlBuilder', () => {
  describe('compile', () => {
    it('returns an empty string for no parameterSet', () => {
      expect(compile()).toBe('')
    })

    it('returns an empty string for no- or an empty transform without defaults', () => {
      expect(compile(imageParameters)).toBe('')
      expect(compile(imageParameters, {})).toBe('')
    })

    it('returns the default transform for no- or an empty transform', () => {
      const defaultTransform = { width: 220, crop: 'fill' }
      expect(compile(imageParameters, undefined, defaultTransform)).toBe('/w_220,c_fill')
      expect(compile(imageParameters, {}, defaultTransform)).toBe('/w_220,c_fill')
    })

    it('compiles a single transform with one or more parameters', () => {
      const compiledTransform = compile(imageParameters, {
        width: 220,
        height: 140,
        crop: 'fill',
      })
      expect(compiledTransform).toBe('/w_220,h_140,c_fill')
    })

    it('compiles a single transform, applying and overriding default parameters', () => {
      const compiledTransform = compile(
        imageParameters,
        { height: 140, radius: 30 },
        { width: 'auto', height: 100, crop: 'fill' },
      )
      expect(compiledTransform).toBe('/w_auto,h_140,c_fill,r_30')
    })

    it('compiles an array of transforms without applying defaults', () => {
      const compiledTransform = compile(
        imageParameters,
        [
          { width: 220, height: 140, crop: 'fill' },
          {
            overlay: 'brown_sheep',
            width: 220,
            height: 140,
            x: 220,
            crop: 'fill',
          },
          {
            overlay: 'horses',
            width: 220,
            height: 140,
            y: 140,
            x: -110,
            crop: 'fill',
          },
          { width: 400, height: 260, radius: 20, crop: 'crop' },
          {
            overlay: {
              text: 'Memories from our trip',
              fontFamily: 'Parisienne',
              fontSize: 35,
              fontWeight: 'bold',
            },
            color: '#990C47',
            y: 155,
          },
          { effect: 'shadow' },
        ],
        { width: 'auto', height: 100, crop: 'fill' },
      )
      expect(compiledTransform).toBe(
        '/w_220,h_140,c_fill' +
          '/l_brown_sheep,w_220,h_140,x_220,c_fill' +
          '/l_horses,w_220,h_140,y_140,x_-110,c_fill' +
          '/w_400,h_260,r_20,c_crop' +
          '/l_text:Parisienne_35_bold:Memories%20from%20our%20trip,co_rgb:990C47,y_155' +
          '/e_shadow',
      )
    })
  })

  describe('urlBuilder', () => {
    it('creates a configurable url builder without transforms', () => {
      const cl = urlBuilder()({ cloudName: 'demo' })
      expect(cl('something')).toBe('https://res.cloudinary.com/demo/image/upload/v1/something')
      expect(cl('something', { type: 'fetch' })).toBe(
        'https://res.cloudinary.com/demo/image/fetch/v1/something',
      )
      expect(cl('something', { resourceType: 'video' })).toBe(
        'https://res.cloudinary.com/demo/video/upload/v1/something',
      )
    })

    it('throws if cloudName is not specified', () => {
      expect(() => urlBuilder()({})).toThrowError(
        /^Cloudinary :: cloudName configuration is required/,
      )
    })

    it('throws on transforms with unsupported parameters', () => {
      const cl = urlBuilder({ image: imageParameters })({ cloudName: 'demo' })
      const badResourceType = () => cl('bad', { resourceType: 'video', width: 300 })
      expect(badResourceType).toThrowError(/^Cloudinary :: resourceType should be one of/)
    })

    it('throws on an invalid type option', () => {
      const cl = urlBuilder()({ cloudName: 'demo' })
      const badResourceType = () => cl('bad', { type: 'invalid' })
      expect(badResourceType).toThrowError(/^Cloudinary :: type should be one of/)
    })

    it('allows overriding the base default resource type', () => {
      const cl = urlBuilder({ video: imageParameters }, 'video')({ cloudName: 'demo' })
      expect(cl('my-video', { width: 300 })).toBe(
        'https://res.cloudinary.com/demo/video/upload/w_300/v1/my-video',
      )
    })

    it('allows overriding the cname', () => {
      const cl = urlBuilder()({
        cloudName: 'demo',
        cname: 'custom.domain.net',
      })
      expect(cl('something')).toBe('https://custom.domain.net/demo/image/upload/v1/something')
    })

    it('supports the cdnSubdomain option', () => {
      const fakeCrc = string => string.length
      const cl = urlBuilder()({ cloudName: 'demo', cdnSubdomain: fakeCrc })
      expect(cl('short')).toBe('https://a1.res.cloudinary.com/demo/image/upload/v1/short')
      expect(cl('two')).toBe('https://a4.res.cloudinary.com/demo/image/upload/v1/two')
      expect(cl('something')).toBe('https://a5.res.cloudinary.com/demo/image/upload/v1/something')
    })

    it('creates non-secure urls if secure is set to false', () => {
      const insecureUrl = '://res.cloudinary.com/demo/image/upload/v1/test'
      expect(urlBuilder()({ cloudName: 'demo', secure: false })('test')).toBe('http' + insecureUrl)
      expect(urlBuilder()({ cloudName: 'demo' })('test', { secure: false })).toBe(
        'http' + insecureUrl,
      )
      expect(
        urlBuilder()({ cloudName: 'demo', secure: false })('test', {
          secure: true,
        }),
      ).toBe('https' + insecureUrl)
    })

    it('allows configuring a default resourceType and type', () => {
      const cl = urlBuilder()({
        cloudName: 'demo',
        defaults: { resourceType: 'raw', type: 'fetch' },
      })
      expect(cl('something')).toBe('https://res.cloudinary.com/demo/raw/fetch/v1/something')
      expect(
        cl('something', {
          resourceType: 'image',
          type: 'upload',
        }),
      ).toBe('https://res.cloudinary.com/demo/image/upload/v1/something')
    })

    it('supports specifying a version', () => {
      const cl = urlBuilder()({ cloudName: 'demo' })
      expect(cl('something', { version: '13245' })).toBe(
        'https://res.cloudinary.com/demo/image/upload/v13245/something',
      )
    })

    it('constructs simple transform urls', () => {
      const cl = urlBuilder({ image: imageParameters })({ cloudName: 'demo' })
      const url = cl('simple.png', { height: 140, zoom: 1.2 })
      expect(url).toBe('https://res.cloudinary.com/demo/image/upload/h_140,z_1.2/v1/simple.png')
    })

    const defaults = { width: 'auto', height: 100, crop: 'fill' }

    it('constructs simple transform urls with defaults', () => {
      const cl = urlBuilder({ image: imageParameters })({
        cloudName: 'demo',
        defaults,
      })
      const url = cl('simple.png', { height: 140, zoom: 1.2 })
      expect(url).toBe(
        'https://res.cloudinary.com/demo/image/upload/w_auto,h_140,c_fill,z_1.2/v1/simple.png',
      )
    })

    it('supports clearing defaults by passing null', () => {
      const cl = urlBuilder({ image: imageParameters })({
        cloudName: 'demo',
        defaults,
      })
      const url = cl('simple.png', { width: null, height: null, zoom: 1.2 })
      expect(url).toBe('https://res.cloudinary.com/demo/image/upload/c_fill,z_1.2/v1/simple.png')
    })

    it('constructs complex transform urls from an array (ignoring defaults)', () => {
      const cl = urlBuilder({ image: imageParameters })({
        cloudName: 'demo',
        defaults,
      })
      expect(
        cl('yellow_tulip.jpg', [
          { width: 220, height: 140, crop: 'fill' },
          {
            overlay: 'brown_sheep',
            width: 220,
            height: 140,
            x: 220,
            crop: 'fill',
          },
          {
            overlay: 'horses',
            width: 220,
            height: 140,
            x: -110,
            y: 140,
            crop: 'fill',
          },
          {
            overlay: 'white_chicken',
            width: 220,
            height: 140,
            x: 110,
            y: 70,
            crop: 'fill',
          },
          { overlay: 'butterfly.png', height: 200, x: -10, angle: 10 },
          { width: 400, height: 260, radius: 20, crop: 'crop' },
          {
            overlay: 'text:Parisienne_35_bold:Memories%20from%20our%20trip',
            color: '#990C47',
            y: 155,
          },
          { effect: 'shadow' },
        ]),
      ).toBe(
        'https://res.cloudinary.com/demo/image/upload/w_220,h_140,c_fill/' +
          'l_brown_sheep,w_220,h_140,x_220,c_fill/' +
          'l_horses,w_220,h_140,x_-110,y_140,c_fill/' +
          'l_white_chicken,w_220,h_140,x_110,y_70,c_fill/' +
          'l_butterfly.png,h_200,x_-10,a_10/' +
          'w_400,h_260,r_20,c_crop/' +
          'l_text:Parisienne_35_bold:Memories%20from%20our%20trip,co_rgb:990C47,y_155/' +
          'e_shadow/v1/yellow_tulip.jpg',
      )
    })

    it('constructs simple transform urls the transform property with other options', () => {
      const cl = urlBuilder({ video: imageParameters })({
        cloudName: 'demo',
        defaults,
      })
      const url = cl('yellow_tulip.mp4', {
        resourceType: 'video',
        transform: { height: 140, crop: 'scale' },
      })
      expect(url).toBe(
        'https://res.cloudinary.com/demo/video/upload/w_auto,h_140,c_scale/v1/yellow_tulip.mp4',
      )
    })

    it('constructs complex transform urls the transform property with other options', () => {
      const cl = urlBuilder({ image: imageParameters })({
        cloudName: 'demo',
        defaults,
      })
      const url = cl('yellow_tulip.jpg', {
        secure: false,
        transform: [
          { width: 220, height: 140, crop: 'fill' },
          {
            overlay: 'brown_sheep',
            width: 220,
            height: 140,
            x: 220,
            crop: 'fill',
          },
        ],
      })
      expect(url).toBe(
        'http://res.cloudinary.com/demo/image/upload/w_220,h_140,c_fill/' +
          'l_brown_sheep,w_220,h_140,x_220,c_fill/v1/yellow_tulip.jpg',
      )
    })

    it('throws an error on an invalid parameter', () => {
      const cl = urlBuilder({ image: imageParameters })({ cloudName: 'demo' })
      const badUrl = () => cl('test.jpg', { width: 220, height: 140, crop: 'bad_option' })
      expect(badUrl).toThrowError(/^Cloudinary Image :: crop should be one of /)
    })
  })
})
