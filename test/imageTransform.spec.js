import { formatParameter, compileParameter, imageTransform } from '../src/imageTransform'

describe('Image Transform Parameter', () => {
  describe('format', () => {
    it('compiles to an empty string for no value', () => {
      expect(formatParameter()).toBe('')
    })
    it('compiles to a file extension', () => {
      expect(formatParameter('jpg')).toBe('.jpg')
    })
    it('throws on an invalid extension', () => {
      expect(() => formatParameter('bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('width', () => {
    it('accepts a number', () => {
      expect(compileParameter('width', 300)).toBe('w_300')
    })
    it('accepts a numeric string', () => {
      expect(compileParameter('width', '300')).toBe('w_300')
    })
    it('accepts `auto`', () => {
      expect(compileParameter('width', 'auto')).toBe('w_auto')
    })
    it('accepts a string starting with `auto:`', () => {
      expect(compileParameter('width', 'auto:50')).toBe('w_auto:50')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('width', 'bad:auto')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('width', 'auto-bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('height', () => {
    it('accepts a number', () => {
      expect(compileParameter('height', 300)).toBe('h_300')
    })
    it('accepts a numeric string', () => {
      expect(compileParameter('height', '300')).toBe('h_300')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('height', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('crop', () => {
    it('accepts valid string values', () => {
      expect(compileParameter('crop', 'scale')).toBe('c_scale')
      expect(compileParameter('crop', 'fill')).toBe('c_fill')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('crop', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('crop', 300)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('aspectRatio', () => {
    it('accepts a number', () => {
      expect(compileParameter('aspectRatio', 1.5)).toBe('ar_1.5')
    })
    it('accepts valid string values', () => {
      expect(compileParameter('aspectRatio', '1.5')).toBe('ar_1.5')
      expect(compileParameter('aspectRatio', '16:9')).toBe('ar_16:9')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('aspectRatio', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('aspectRatio', '7:')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('gravity', () => {
    it('accepts valid string values', () => {
      expect(compileParameter('gravity', 'south_west')).toBe('g_south_west')
      expect(compileParameter('gravity', 'custom:face')).toBe('g_custom:face')
    })
    it('accepts `auto`', () => {
      expect(compileParameter('gravity', 'auto')).toBe('g_auto')
    })
    it('accepts a string starting with `auto:`', () => {
      expect(compileParameter('gravity', 'auto:50')).toBe('g_auto:50')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('gravity', 'bad:auto')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('gravity', 'auto-bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('fetchFormat', () => {
    it('accepts valid file formats', () => {
      expect(compileParameter('fetchFormat', 'jpg')).toBe('f_jpg')
      expect(compileParameter('fetchFormat', 'png')).toBe('f_png')
    })
    it('accepts `auto`', () => {
      expect(compileParameter('fetchFormat', 'auto')).toBe('f_auto')
    })
    it('throws when invalid', () => {
      expect(() => formatParameter('bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('quality', () => {
    it('accepts a number between 1 an 100 inclusive', () => {
      expect(compileParameter('quality', 1)).toBe('q_1')
      expect(compileParameter('quality', 60)).toBe('q_60')
      expect(compileParameter('quality', 100)).toBe('q_100')
    })
    it('accepts a numeric string', () => {
      expect(compileParameter('quality', '50')).toBe('q_50')
    })
    it('accepts a percentage and chroma sub-sampling', () => {
      expect(compileParameter('quality', '60:420')).toBe('q_60:420')
    })
    it('accepts `auto`, auto variants and `jpegmini`', () => {
      expect(compileParameter('quality', 'auto')).toBe('q_auto')
      expect(compileParameter('quality', 'auto:best')).toBe('q_auto:best')
      expect(compileParameter('quality', 'jpegmini')).toBe('q_jpegmini')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('quality', 0)).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('quality', 105)).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('quality', '105')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('quality', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('quality', 'auto:bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('radius', () => {
    it('accepts a number', () => {
      expect(compileParameter('radius', 30)).toBe('r_30')
    })
    it('accepts a numeric string', () => {
      expect(compileParameter('radius', '30')).toBe('r_30')
    })
    it('accepts a string of the form x[:y[:z[:u]]]', () => {
      expect(compileParameter('radius', '20:0')).toBe('r_20:0')
      expect(compileParameter('radius', '20:0:40')).toBe('r_20:0:40')
      expect(compileParameter('radius', '20:0:40:40')).toBe('r_20:0:40:40')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('radius', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('radius', '20:0:40:40:90')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('zoom', () => {
    it('accepts a number', () => {
      expect(compileParameter('zoom', 30)).toBe('z_30')
    })
    it('accepts a numeric string', () => {
      expect(compileParameter('zoom', '30')).toBe('z_30')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('zoom', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('x', () => {
    it('accepts a number', () => {
      expect(compileParameter('x', 100)).toBe('x_100')
    })
    it('accepts a numeric string', () => {
      expect(compileParameter('x', '100')).toBe('x_100')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('x', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('y', () => {
    it('accepts a number', () => {
      expect(compileParameter('y', 100)).toBe('y_100')
    })
    it('accepts a numeric string', () => {
      expect(compileParameter('y', '100')).toBe('y_100')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('y', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })
})

describe('Image Transforms', () => {
  describe('imageTransform', () => {
    it('compiles to a width', () => {
      expect(imageTransform({width: 300})).toBe('w_300')
    })
  })
})
