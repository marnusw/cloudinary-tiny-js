import cloudinary from './cloudinary'

describe('cloudinary configuration', () => {
  it('throws if cloudName is not specified', () => {
    // @ts-ignore Test for JS
    expect(() => cloudinary({})).toThrowError(
      'Cloudinary configuration requires a `cloudName` option.',
    )
  })

  it('uses sane defaults', () => {
    const cl = cloudinary({ cloudName: 'demo' })
    expect(cl('something')).toBe('https://res.cloudinary.com/demo/image/upload/something')
  })

  it('accepts all possible config values', () => {
    expect(
      cloudinary({
        cloudName: 'demo',
        assetType: 'video',
        deliveryType: 'fetch',
        secure: false,
        cdnSubdomain: 'sub',
        cname: 'example.net',
      })('something'),
    ).toBe('http://example.net/demo/video/fetch/something')
    expect(
      cloudinary({
        cloudName: 'demo',
        assetType: 'video',
        deliveryType: 'fetch',
        secure: false,
        cdnSubdomain: 'sub',
      })('something'),
    ).toBe('http://sub.cloudinary.com/demo/video/fetch/something')
  })

  it('overrides selected config values provided with the transform', () => {
    const cl = cloudinary({ cloudName: 'demo' })
    expect(cl('something', { assetType: 'video', deliveryType: 'fetch' })).toBe(
      'https://res.cloudinary.com/demo/video/fetch/something',
    )
  })

  it('adds a version when provided, with or without the `v`', () => {
    const cl = cloudinary({ cloudName: 'demo' })
    expect(cl('something', { version: 20 })).toBe(
      'https://res.cloudinary.com/demo/image/upload/v20/something',
    )
    expect(cl('something', { version: 'v33' })).toBe(
      'https://res.cloudinary.com/demo/image/upload/v33/something',
    )
  })

  it('transforms can be passed on the parent object, transformations property, directly as an array', () => {
    const cl = cloudinary({ cloudName: 'demo' })
    expect(cl('parent-object', { width: 100, crop: 'fit' })).toBe(
      'https://res.cloudinary.com/demo/image/upload/w_100,c_fit/parent-object',
    )
    expect(cl('single-transformation', { width: 200, crop: 'fill' })).toBe(
      'https://res.cloudinary.com/demo/image/upload/w_200,c_fill/single-transformation',
    )
    expect(
      cl('transformations-array', {
        transformations: [{ overlay: 'some-id' }, { height: 100, crop: 'fit' }],
      }),
    ).toBe(
      'https://res.cloudinary.com/demo/image/upload/l_some-id/h_100,c_fit/transformations-array',
    )
    expect(
      cl('transformations-array', [{ overlay: 'some-id' }, { height: 100, crop: 'fit' }]),
    ).toBe(
      'https://res.cloudinary.com/demo/image/upload/l_some-id/h_100,c_fit/transformations-array',
    )
  })

  it('applies default transforms when no additional transform is provided', () => {
    const cl = cloudinary({
      cloudName: 'demo',
      imageTransformDefaults: { width: 200, crop: 'fill', quality: 'auto' },
    })
    expect(cl('something')).toBe(
      'https://res.cloudinary.com/demo/image/upload/w_200,c_fill,q_auto/something',
    )
  })

  it('format auto is supported in defaults', () => {
    const cl = cloudinary({
      cloudName: 'demo',
      imageTransformDefaults: { width: 200, crop: 'fill', quality: 'auto', format: 'auto' },
    })
    expect(cl('something')).toBe(
      'https://res.cloudinary.com/demo/image/upload/w_200,c_fill,q_auto,f_auto/something',
    )
  })

  it('merges a single transform with the defaults, and unsets a default when undefined is passed', () => {
    const cl = cloudinary({
      cloudName: 'demo',
      imageTransformDefaults: { width: 200, crop: 'fill', quality: 'auto' },
    })
    expect(cl('something')).toBe(
      'https://res.cloudinary.com/demo/image/upload/w_200,c_fill,q_auto/something',
    )
    expect(cl('something', { height: 100, crop: 'fit', quality: undefined })).toBe(
      'https://res.cloudinary.com/demo/image/upload/w_200,c_fit,h_100/something',
    )
    expect(
      cl('something', {
        deliveryType: 'fetch',
        transformations: { height: 100, crop: 'fit', quality: undefined },
      }),
    ).toBe('https://res.cloudinary.com/demo/image/fetch/w_200,c_fit,h_100/something')
  })

  it('does not apply default transforms when multiple transformations are used', () => {
    const cl = cloudinary({
      cloudName: 'demo',
      imageTransformDefaults: { width: 200, crop: 'fill', quality: 'auto' },
    })
    expect(
      cl('something', {
        transformations: [{ overlay: 'some_id' }, { height: 100, crop: 'fit', quality: undefined }],
      }),
    ).toBe('https://res.cloudinary.com/demo/image/upload/l_some_id/h_100,c_fit/something')
  })

  it('only applies transforms to images', () => {
    const cl = cloudinary({
      cloudName: 'demo',
      assetType: 'video',
      imageTransformDefaults: { width: 200, crop: 'fill', quality: 'auto' },
    })
    expect(cl('something')).toBe('https://res.cloudinary.com/demo/video/upload/something')
  })

  it('constructs complex urls from multiple transforms', () => {
    const cl = cloudinary({
      cloudName: 'demo',
      imageTransformDefaults: { width: 200, crop: 'fill', quality: 'auto' },
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
        'e_shadow/yellow_tulip.jpg',
    )
  })

  it('throws an error on an invalid transform parameter', () => {
    const cl = cloudinary({ cloudName: 'demo' })
    // @ts-ignore Test for JS
    const badUrl = () => cl('test.jpg', { width: 220, height: 140, crop: 'bad_option' })
    expect(badUrl).toThrowError(/^Cloudinary Image :: crop should be one of /)
  })
})
