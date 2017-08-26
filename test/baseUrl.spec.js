import baseUrl from '../src/baseUrl'

describe('baseUrl', () => {
  it('creates a secure Cloudinary URL with just a cloudName', () => {
    expect(baseUrl({cloudName: 'demo'})).toBe('https://res.cloudinary.com/demo/image/upload/')
  })

  it('handles advanced options', () => {
    expect(baseUrl({
      cloudName: 'demo1',
      subDomain: 'test',
    })).toBe('https://test.cloudinary.com/demo1/image/upload/')
    expect(baseUrl({
      cloudName: 'demo2',
      hostName: 'test.example.net',
      secure: false,
    })).toBe('http://test.example.net/demo2/image/upload/')
  })
})
