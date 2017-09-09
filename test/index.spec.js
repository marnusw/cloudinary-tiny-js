import cloudinary from '../src/index'

describe('cloudinary', () => {
  it('exports a url builder ready for configuration', () => {
    const cl = cloudinary({cloudName: 'index'})

    const rawUrl = cl('any.file', {resourceType: 'raw'})
    expect(rawUrl).toBe('https://res.cloudinary.com/index/raw/upload/v1/any.file')

    const imageUrl = cl('simple.png', {height: 140, zoom: 1.2})
    expect(imageUrl).toBe('https://res.cloudinary.com/index/image/upload/h_140,z_1.2/v1/simple.png')

    expect(() => cl('bad', {
      resourceType: 'video',
      width: 300
    })).toThrowError(/^Cloudinary :: resourceType should be one of/)
  })
})
