import videoParameters from '../src/videoParameters'

describe('Video Transform Parameters', () => {
  describe('invalid parameters', () => {
    it('throws an error', () => {
      try {
        videoParameters('abc', 'def')
      } catch (error) {
        expect(error.message).toBe(`Cloudinary Video :: unknown transform parameter provided: 'abc'`)
        return
      }
      throw new Error('videoParameters should have thrown')
    })
  })
})
