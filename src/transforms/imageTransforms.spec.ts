import { compileImageParameter } from './imageTransforms'

describe('Image Transform Parameters', () => {
  describe('width', () => {
    it('accepts a number', () => {
      expect(compileImageParameter('width', 300)).toBe('w_300')
    })
    it('accepts a numeric string', () => {
      expect(compileImageParameter('width', '300')).toBe('w_300')
    })
    it('accepts `auto`', () => {
      expect(compileImageParameter('width', 'auto')).toBe('w_auto')
    })
    it('accepts a string starting with `auto:`', () => {
      expect(compileImageParameter('width', 'auto:50')).toBe('w_auto:50')
    })
    it('accepts `iw`', () => {
      expect(compileImageParameter('width', 'iw')).toBe('w_iw')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('width', 'bad:auto')).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('width', 'auto-bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('height', () => {
    it('accepts a number', () => {
      expect(compileImageParameter('height', 300)).toBe('h_300')
    })
    it('accepts a numeric string', () => {
      expect(compileImageParameter('height', '300')).toBe('h_300')
    })
    it('accepts `ih`', () => {
      expect(compileImageParameter('height', 'ih')).toBe('h_ih')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('height', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('crop', () => {
    it('accepts valid string values', () => {
      expect(compileImageParameter('crop', 'scale')).toBe('c_scale')
      expect(compileImageParameter('crop', 'fill')).toBe('c_fill')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('crop', 'bad')).toThrowErrorMatchingSnapshot()
      // @ts-ignore Test for JS
      expect(() => compileImageParameter('crop', 300)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('aspectRatio', () => {
    it('accepts a number', () => {
      expect(compileImageParameter('aspectRatio', 1.5)).toBe('ar_1.5')
    })
    it('accepts valid string values', () => {
      expect(compileImageParameter('aspectRatio', '1.5')).toBe('ar_1.5')
      expect(compileImageParameter('aspectRatio', '16:9')).toBe('ar_16:9')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('aspectRatio', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('aspectRatio', '7:')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('gravity', () => {
    it('accepts valid string values', () => {
      expect(compileImageParameter('gravity', 'south_west')).toBe('g_south_west')
      expect(compileImageParameter('gravity', 'custom:face')).toBe('g_custom:face')
    })
    it('accepts `auto`', () => {
      expect(compileImageParameter('gravity', 'auto')).toBe('g_auto')
    })
    it('accepts a string starting with `auto:`', () => {
      expect(compileImageParameter('gravity', 'auto:50')).toBe('g_auto:50')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('gravity', 'bad:auto')).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('gravity', 'auto-bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('zoom', () => {
    it('accepts a number', () => {
      expect(compileImageParameter('zoom', 30)).toBe('z_30')
    })
    it('accepts a numeric string', () => {
      expect(compileImageParameter('zoom', '30')).toBe('z_30')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('zoom', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('x', () => {
    it('accepts a number', () => {
      expect(compileImageParameter('x', 100)).toBe('x_100')
    })
    it('accepts a numeric string', () => {
      expect(compileImageParameter('x', '100')).toBe('x_100')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('x', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('y', () => {
    it('accepts a number', () => {
      expect(compileImageParameter('y', 100)).toBe('y_100')
    })
    it('accepts a numeric string', () => {
      expect(compileImageParameter('y', '100')).toBe('y_100')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('y', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('format', () => {
    it('accepts valid file formats', () => {
      expect(compileImageParameter('format', 'jpg')).toBe('f_jpg')
      expect(compileImageParameter('format', 'png')).toBe('f_png')
    })
    it('accepts `auto`', () => {
      expect(compileImageParameter('format', 'auto')).toBe('f_auto')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('format', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('fetchFormat', () => {
    it('accepts valid file formats', () => {
      expect(compileImageParameter('fetchFormat', 'jpg')).toBe('f_jpg')
      expect(compileImageParameter('fetchFormat', 'png')).toBe('f_png')
    })
    it('accepts `auto`', () => {
      expect(compileImageParameter('fetchFormat', 'auto')).toBe('f_auto')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('fetchFormat', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('quality', () => {
    it('accepts a number between 1 an 100 inclusive', () => {
      expect(compileImageParameter('quality', 1)).toBe('q_1')
      expect(compileImageParameter('quality', 60)).toBe('q_60')
      expect(compileImageParameter('quality', 100)).toBe('q_100')
    })
    it('accepts a numeric string', () => {
      expect(compileImageParameter('quality', '50')).toBe('q_50')
    })
    it('accepts a percentage and chroma sub-sampling', () => {
      expect(compileImageParameter('quality', '60:420')).toBe('q_60:420')
    })
    it('accepts `auto`, auto variants and `jpegmini`', () => {
      expect(compileImageParameter('quality', 'auto')).toBe('q_auto')
      expect(compileImageParameter('quality', 'auto:best')).toBe('q_auto:best')
      expect(compileImageParameter('quality', 'jpegmini')).toBe('q_jpegmini')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('quality', 0)).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('quality', 105)).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('quality', '105')).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('quality', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('quality', 'auto:bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('radius', () => {
    it('accepts a number', () => {
      expect(compileImageParameter('radius', 30)).toBe('r_30')
    })
    it('accepts a numeric string', () => {
      expect(compileImageParameter('radius', '30')).toBe('r_30')
    })
    it('accepts a string of the form x[:y[:z[:u]]]', () => {
      expect(compileImageParameter('radius', '20:0')).toBe('r_20:0')
      expect(compileImageParameter('radius', '20:0:40')).toBe('r_20:0:40')
      expect(compileImageParameter('radius', '20:0:40:40')).toBe('r_20:0:40:40')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('radius', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('radius', '20:0:40:40:90')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('angle', () => {
    it('accepts a number', () => {
      expect(compileImageParameter('angle', 90)).toBe('a_90')
      expect(compileImageParameter('angle', -20)).toBe('a_-20')
    })
    it('accepts a numeric string', () => {
      expect(compileImageParameter('angle', '10')).toBe('a_10')
      expect(compileImageParameter('angle', '-20')).toBe('a_-20')
    })
    it('accepts valid modes', () => {
      expect(compileImageParameter('angle', 'auto_right')).toBe('a_auto_right')
      expect(compileImageParameter('angle', 'vflip')).toBe('a_vflip')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('angle', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('effect', () => {
    it('accepts any value', () => {
      expect(compileImageParameter('effect', 'hue:40')).toBe('e_hue:40')
      expect(compileImageParameter('effect', 'negate')).toBe('e_negate')
    })
  })

  describe('opacity', () => {
    it('accepts a number between 0 and 100', () => {
      expect(compileImageParameter('opacity', 0)).toBe('o_0')
      expect(compileImageParameter('opacity', 30)).toBe('o_30')
      expect(compileImageParameter('opacity', 100)).toBe('o_100')
    })
    it('accepts a numeric string', () => {
      expect(compileImageParameter('opacity', '0')).toBe('o_0')
      expect(compileImageParameter('opacity', '30')).toBe('o_30')
      expect(compileImageParameter('opacity', '100')).toBe('o_100')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('opacity', -1)).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('opacity', 101)).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('opacity', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('border', () => {
    it('accepts a fully formed width_style_color string', () => {
      expect(compileImageParameter('border', '4px_solid_black')).toBe('bo_4px_solid_black')
      expect(compileImageParameter('border', '4px_solid_#2040fa')).toBe('bo_4px_solid_rgb:2040fa')
      expect(compileImageParameter('border', '4px_solid_rgb:2040fa')).toBe(
        'bo_4px_solid_rgb:2040fa',
      )
      expect(compileImageParameter('border', '4px_solid_rgb:2040faf0')).toBe(
        'bo_4px_solid_rgb:2040faf0',
      )
    })
    it('accepts a object with color and optional width', () => {
      expect(compileImageParameter('border', { color: 'red' })).toBe('bo_1px_solid_red')
      expect(compileImageParameter('border', { color: '#3020ff' })).toBe('bo_1px_solid_rgb:3020ff')
      expect(compileImageParameter('border', { color: '#3020ff22' })).toBe(
        'bo_1px_solid_rgb:3020ff22',
      )
      expect(compileImageParameter('border', { color: 'rgb:3020ff' })).toBe(
        'bo_1px_solid_rgb:3020ff',
      )
      expect(compileImageParameter('border', { color: 'rgb:3020ff22' })).toBe(
        'bo_1px_solid_rgb:3020ff22',
      )
      expect(compileImageParameter('border', { color: 'red', width: 3 })).toBe('bo_3px_solid_red')
      expect(compileImageParameter('border', { color: '#3020ff', width: '2px' })).toBe(
        'bo_2px_solid_rgb:3020ff',
      )
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('border', 'bad')).toThrowErrorMatchingSnapshot()
      // @ts-ignore Test for JS
      expect(() => compileImageParameter('border', { width: 1 })).toThrowErrorMatchingSnapshot()
      expect(() =>
        compileImageParameter('border', { color: '#3020f' }),
      ).toThrowErrorMatchingSnapshot()
      expect(() =>
        compileImageParameter('border', { color: '#3020ff2' }),
      ).toThrowErrorMatchingSnapshot()
    })
  })

  describe('background', () => {
    it('accepts a color', () => {
      expect(compileImageParameter('background', 'blue')).toBe('b_blue')
      expect(compileImageParameter('background', '#3020ff')).toBe('b_rgb:3020ff')
      expect(compileImageParameter('background', '#3020ff22')).toBe('b_rgb:3020ff22')
      expect(compileImageParameter('background', 'rgb:3020ff')).toBe('b_rgb:3020ff')
      expect(compileImageParameter('background', 'rgb:3020ff22')).toBe('b_rgb:3020ff22')
    })
    it('accepts valid `auto:mode` strings', () => {
      expect(compileImageParameter('background', 'auto:border')).toBe('b_auto:border')
      expect(compileImageParameter('background', 'auto:border_contrast')).toBe(
        'b_auto:border_contrast',
      )
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('background', 'auto:bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('background', '#3020f')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('overlay', () => {
    it('accepts any string as public id', () => {
      expect(compileImageParameter('overlay', 'badge')).toBe('l_badge')
      expect(compileImageParameter('overlay', 'red_button.jpg')).toBe('l_red_button.jpg')
      expect(compileImageParameter('overlay', 'text:Arial_50:Smile!')).toBe(
        'l_text:Arial_50:Smile!',
      )
      expect(compileImageParameter('overlay', 'text:default_style:Hello+World')).toBe(
        'l_text:default_style:Hello+World',
      )
    })
    it('accepts an object with `text` and a `publicId`', () => {
      expect(
        compileImageParameter('overlay', {
          text: 'Hello World',
          publicId: 'default_style',
        }),
      ).toBe('l_text:default_style:Hello%20World')
    })
    it('accepts an object with `text` and text caption options', () => {
      expect(
        compileImageParameter('overlay', {
          text: 'Hello World',
          fontFamily: 'Times New Roman',
          fontSize: '16',
        }),
      ).toBe('l_text:Times%20New%20Roman_16:Hello%20World')
      expect(
        compileImageParameter('overlay', {
          text: 'Flowers',
          fontFamily: 'verdana',
          fontSize: 18,
          fontWeight: 'bold',
          fontStyle: 'italic',
          textDecoration: 'underline',
          textAlign: 'center',
          stroke: 'stroke',
          letterSpacing: 4,
          lineSpacing: 3.3,
        }),
      ).toBe(
        'l_text:verdana_18_bold_italic_underline_center_stroke_letter_spacing_4_line_spacing_3.3:Flowers',
      )
      expect(
        compileImageParameter('overlay', {
          text: 'Bananas',
          fontFamily: 'Arial',
          fontSize: 12,
          fontWeight: 'normal',
          fontStyle: 'normal',
          textDecoration: 'none',
          textAlign: 'left',
          stroke: 'none',
          letterSpacing: 2,
          lineSpacing: 1.5,
        }),
      ).toBe('l_text:Arial_12_left_letter_spacing_2_line_spacing_1.5:Bananas')
    })
    it('throws when invalid', () => {
      expect(() =>
        compileImageParameter('overlay', { text: 'No fontFamily', fontSize: 12 }),
      ).toThrowErrorMatchingSnapshot()
      expect(() =>
        compileImageParameter('overlay', {
          text: 'No fontSize',
          fontFamily: 'Arial',
        }),
      ).toThrowErrorMatchingSnapshot()
    })
  })

  describe('underlay', () => {
    it('accepts any string as public id', () => {
      expect(compileImageParameter('underlay', 'badge')).toBe('u_badge')
      expect(compileImageParameter('underlay', 'red_button.jpg')).toBe('u_red_button.jpg')
      expect(compileImageParameter('underlay', 'text:Arial_50:Smile!')).toBe(
        'u_text:Arial_50:Smile!',
      )
      expect(compileImageParameter('underlay', 'text:default_style:Hello+World')).toBe(
        'u_text:default_style:Hello+World',
      )
    })
    it('accepts an object with `text` and a `publicId`', () => {
      expect(
        compileImageParameter('underlay', {
          text: 'Hello World',
          publicId: 'default_style',
        }),
      ).toBe('u_text:default_style:Hello%20World')
    })
    it('accepts an object with `text` and text caption options', () => {
      expect(
        compileImageParameter('underlay', {
          text: 'Hello World',
          fontFamily: 'Times New Roman',
          fontSize: '16',
        }),
      ).toBe('u_text:Times%20New%20Roman_16:Hello%20World')
      expect(
        compileImageParameter('underlay', {
          text: 'Flowers',
          fontFamily: 'verdana',
          fontSize: 18,
          fontWeight: 'bold',
          fontStyle: 'italic',
          textDecoration: 'underline',
          textAlign: 'center',
          stroke: 'stroke',
          letterSpacing: 4,
          lineSpacing: 3.3,
        }),
      ).toBe(
        'u_text:verdana_18_bold_italic_underline_center_stroke_letter_spacing_4_line_spacing_3.3:Flowers',
      )
      expect(
        compileImageParameter('underlay', {
          text: 'Bananas',
          fontFamily: 'Arial',
          fontSize: 12,
          fontWeight: 'normal',
          fontStyle: 'normal',
          textDecoration: 'none',
          textAlign: 'left',
          stroke: 'none',
          letterSpacing: 2,
          lineSpacing: 1.5,
        }),
      ).toBe('u_text:Arial_12_left_letter_spacing_2_line_spacing_1.5:Bananas')
    })
    it('throws when invalid', () => {
      expect(() =>
        compileImageParameter('underlay', { text: 'No fontFamily', fontSize: 12 }),
      ).toThrowErrorMatchingSnapshot()
      expect(() =>
        compileImageParameter('underlay', {
          text: 'No fontSize',
          fontFamily: 'Arial',
        }),
      ).toThrowErrorMatchingSnapshot()
    })
  })

  describe('defaultImage', () => {
    it('accepts any public id with a file extension', () => {
      expect(compileImageParameter('defaultImage', 'image_1.jpg')).toBe('d_image_1.jpg')
      expect(compileImageParameter('defaultImage', 'image+a-char.png')).toBe('d_image+a-char.png')
    })
    it('throws when invalid', () => {
      expect(() =>
        compileImageParameter('defaultImage', 'noExtension'),
      ).toThrowErrorMatchingSnapshot()
      expect(() =>
        compileImageParameter('defaultImage', 'badExtension.abc'),
      ).toThrowErrorMatchingSnapshot()
    })
  })

  describe('delay', () => {
    it('accepts a positive number', () => {
      expect(compileImageParameter('delay', 30)).toBe('dl_30')
    })
    it('accepts a numeric string', () => {
      expect(compileImageParameter('delay', '30')).toBe('dl_30')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('delay', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('delay', '-10')).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('delay', -10)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('color', () => {
    it('accepts a color string', () => {
      expect(compileImageParameter('color', 'green')).toBe('co_green')
      expect(compileImageParameter('color', '#204')).toBe('co_rgb:204')
      expect(compileImageParameter('color', '#204f')).toBe('co_rgb:204f')
      expect(compileImageParameter('color', '#2040fa')).toBe('co_rgb:2040fa')
      expect(compileImageParameter('color', 'rgb:2040fa')).toBe('co_rgb:2040fa')
      expect(compileImageParameter('color', 'rgb:2040faf0')).toBe('co_rgb:2040faf0')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('color', '#30')).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('color', '#3020f')).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('color', '#3020ff2')).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('color', '#3020ff2ff')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('colorSpace', () => {
    it('accepts predefined values', () => {
      expect(compileImageParameter('colorSpace', 'srgb')).toBe('cs_srgb')
      expect(compileImageParameter('colorSpace', 'tinysrgb')).toBe('cs_tinysrgb')
      expect(compileImageParameter('colorSpace', 'no_cmyk')).toBe('cs_no_cmyk')
    })
    it('accepts `cs_icc:(public_id)` values', () => {
      expect(compileImageParameter('colorSpace', 'icc:some_id.icc')).toBe('cs_icc:some_id.icc')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('colorSpace', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() =>
        compileImageParameter('colorSpace', 'bad:some_id'),
      ).toThrowErrorMatchingSnapshot()
      expect(() =>
        compileImageParameter('colorSpace', 'cs_icc:no_extension'),
      ).toThrowErrorMatchingSnapshot()
    })
  })

  describe('dpr', () => {
    it('accepts a positive number', () => {
      expect(compileImageParameter('dpr', 3)).toBe('dpr_3')
    })
    it('accepts a numeric string', () => {
      expect(compileImageParameter('dpr', '2.0')).toBe('dpr_2.0')
    })
    it('accepts the value `auto`', () => {
      expect(compileImageParameter('dpr', 'auto')).toBe('dpr_auto')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('dpr', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('dpr', -1)).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('dpr', 0)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('page', () => {
    it('accepts a positive number', () => {
      expect(compileImageParameter('page', 3)).toBe('pg_3')
    })
    it('accepts a numeric string', () => {
      expect(compileImageParameter('page', '20')).toBe('pg_20')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('page', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('page', -1)).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('page', 0)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('density', () => {
    it('accepts a positive number up to 300', () => {
      expect(compileImageParameter('density', 10)).toBe('dn_10')
      expect(compileImageParameter('density', 300)).toBe('dn_300')
    })
    it('accepts a numeric string', () => {
      expect(compileImageParameter('density', '20')).toBe('dn_20')
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('density', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('density', 301)).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('density', -1)).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('density', 0)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('flags', () => {
    it('accepts a valid value', () => {
      expect(compileImageParameter('flags', 'any_format')).toBe('fl_any_format')
      expect(compileImageParameter('flags', 'attachment')).toBe('fl_attachment')
    })
    it('accepts an array of valid values', () => {
      expect(compileImageParameter('flags', ['clip_evenodd', 'cutter', 'force_strip'])).toBe(
        'fl_clip_evenodd.cutter.force_strip',
      )
    })
    it('accepts a string of `.` separated values', () => {
      expect(compileImageParameter('flags', 'layer_apply.lossy.no_overflow')).toBe(
        'fl_layer_apply.lossy.no_overflow',
      )
    })
    it('throws when invalid', () => {
      expect(() => compileImageParameter('flags', 'bad')).toThrowErrorMatchingSnapshot()
      // @ts-ignore Test for JS
      expect(() =>
        compileImageParameter('flags', ['any_format', 'bad']),
      ).toThrowErrorMatchingSnapshot()
      expect(() => compileImageParameter('flags', 'attachment.bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('null value on any parameter', () => {
    it('returns false for easy filtering', () => {
      expect(compileImageParameter('crop', undefined)).toBe(false)
    })
  })

  describe('invalid parameter', () => {
    it('throws an error', () => {
      try {
        // @ts-ignore Test for JS
        compileImageParameter('abc', 'def')
      } catch (error) {
        expect(error.message).toBe(
          `Cloudinary Image :: unknown transform parameter provided: 'abc'`,
        )
        return
      }
      throw new Error('compileImageParameter should have thrown')
    })
  })
})
