import { compileFormat, compileOption, compileTransforms } from '../src/compileTransforms'

describe('compileTransforms', () => {
  describe('compileFormat', () => {
    it('compiles to an empty string for no value', () => {
      expect(compileFormat()).toBe('')
    })
  })

  describe('compileOption', () => {
    describe('width', () => {
      it('compiles with a number', () => {
        expect(compileOption('width', 300)).toBe('w_300')
      })
    })
  })

  describe('compileTransforms', () => {
    it('compiles to a width', () => {
      expect(compileTransforms({width: 300})).toBe('w_300')
    })
  })
})
