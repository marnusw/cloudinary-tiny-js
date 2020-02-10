import videoParameter from '../../src/parameters/video'

describe('Video Transform Parameters', () => {
  describe('invalid parameters', () => {
    it('throws an error', () => {
      try {
        videoParameter('abc', 'def')
      } catch (error) {
        expect(error.message).toBe(
          `Cloudinary Video :: unknown transform parameter provided: 'abc'`,
        )
        return
      }
      throw new Error('videoParameters should have thrown')
    })
  })
})
