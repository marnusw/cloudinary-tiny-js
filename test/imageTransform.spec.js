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

  describe('angle', () => {
    it('accepts a number', () => {
      expect(compileParameter('angle', 90)).toBe('a_90')
      expect(compileParameter('angle', -20)).toBe('a_-20')
    })
    it('accepts a numeric string', () => {
      expect(compileParameter('angle', '10')).toBe('a_10')
      expect(compileParameter('angle', '-20')).toBe('a_-20')
    })
    it('accepts valid modes', () => {
      expect(compileParameter('angle', 'auto_right')).toBe('a_auto_right')
      expect(compileParameter('angle', 'vflip')).toBe('a_vflip')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('angle', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('effect', () => {
    it('accepts any value', () => {
      expect(compileParameter('effect', 'hue:40')).toBe('e_hue:40')
      expect(compileParameter('effect', 'negate')).toBe('e_negate')
    })
  })

  describe('opacity', () => {
    it('accepts a number between 0 and 100', () => {
      expect(compileParameter('opacity', 0)).toBe('o_0')
      expect(compileParameter('opacity', 30)).toBe('o_30')
      expect(compileParameter('opacity', 100)).toBe('o_100')
    })
    it('accepts a numeric string', () => {
      expect(compileParameter('opacity', '0')).toBe('o_0')
      expect(compileParameter('opacity', '30')).toBe('o_30')
      expect(compileParameter('opacity', '100')).toBe('o_100')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('opacity', -1)).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('opacity', 101)).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('opacity', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('border', () => {
    it('accepts a fully formed width_style_color string', () => {
      expect(compileParameter('border', '4px_solid_black')).toBe('bo_4px_solid_black')
      expect(compileParameter('border', '4px_solid_#2040fa')).toBe('bo_4px_solid_rgb:2040fa')
      expect(compileParameter('border', '4px_solid_rgb:2040fa')).toBe('bo_4px_solid_rgb:2040fa')
      expect(compileParameter('border', '4px_solid_rgb:2040faf0')).toBe('bo_4px_solid_rgb:2040faf0')
    })
    it('accepts a object with color and optional width', () => {
      expect(compileParameter('border', {color: 'red'})).toBe('bo_1px_solid_red')
      expect(compileParameter('border', {color: '#3020ff'})).toBe('bo_1px_solid_rgb:3020ff')
      expect(compileParameter('border', {color: '#3020ff22'})).toBe('bo_1px_solid_rgb:3020ff22')
      expect(compileParameter('border', {color: 'rgb:3020ff'})).toBe('bo_1px_solid_rgb:3020ff')
      expect(compileParameter('border', {color: 'rgb:3020ff22'})).toBe('bo_1px_solid_rgb:3020ff22')
      expect(compileParameter('border', {color: 'red', width: 3})).toBe('bo_3px_solid_red')
      expect(compileParameter('border', {color: '#3020ff', width: '2px'})).toBe('bo_2px_solid_rgb:3020ff')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('border', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('border', {width: 1})).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('border', {color: '#3020f'})).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('border', {color: '#3020ff2'})).toThrowErrorMatchingSnapshot()
    })
  })

  describe('background', () => {
    it('accepts a color', () => {
      expect(compileParameter('background', 'blue')).toBe('b_blue')
      expect(compileParameter('background', '#3020ff')).toBe('b_rgb:3020ff')
      expect(compileParameter('background', '#3020ff22')).toBe('b_rgb:3020ff22')
      expect(compileParameter('background', 'rgb:3020ff')).toBe('b_rgb:3020ff')
      expect(compileParameter('background', 'rgb:3020ff22')).toBe('b_rgb:3020ff22')
    })
    it('accepts valid `auto:mode` strings', () => {
      expect(compileParameter('background', 'auto:border')).toBe('b_auto:border')
      expect(compileParameter('background', 'auto:border_contrast')).toBe('b_auto:border_contrast')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('background', 78)).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('background', 'auto:bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('background', '#3020f')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('overlay', () => {
    it('accepts any string as public id', () => {
      expect(compileParameter('overlay', 'badge')).toBe('l_badge')
      expect(compileParameter('overlay', 'red_button.jpg')).toBe('l_red_button.jpg')
      expect(compileParameter('overlay', 'text:Arial_50:Smile!')).toBe('l_text:Arial_50:Smile!')
      expect(compileParameter('overlay', 'text:default_style:Hello+World')).toBe('l_text:default_style:Hello+World')
    })
    it('accepts an object with `text` and a `publicId`', () => {
      expect(compileParameter('overlay', {
        text: 'Hello World',
        publicId: 'default_style'
      })).toBe('l_text:default_style:Hello%20World')
    })
    it('accepts an object with `text` and text caption options', () => {
      expect(compileParameter('overlay', {
        text: 'Hello World',
        fontFamily: 'Times New Roman',
        fontSize: '16',
      })).toBe('l_text:Times%20New%20Roman_16:Hello%20World')
      expect(compileParameter('overlay', {
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
      })).toBe('l_text:verdana_18_bold_italic_underline_center_stroke_letter_spacing_4_line_spacing_3.3:Flowers')
      expect(compileParameter('overlay', {
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
      })).toBe('l_text:Arial_12_left_letter_spacing_2_line_spacing_1.5:Bananas')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('overlay', 78)).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('overlay', {text: 'No fontFamily', fontSize: 12})).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('overlay', {
        text: 'No fontSize',
        fontFamily: 'Arial'
      })).toThrowErrorMatchingSnapshot()
    })
  })

  describe('underlay', () => {
    it('accepts any string as public id', () => {
      expect(compileParameter('underlay', 'badge')).toBe('u_badge')
      expect(compileParameter('underlay', 'red_button.jpg')).toBe('u_red_button.jpg')
      expect(compileParameter('underlay', 'text:Arial_50:Smile!')).toBe('u_text:Arial_50:Smile!')
      expect(compileParameter('underlay', 'text:default_style:Hello+World')).toBe('u_text:default_style:Hello+World')
    })
    it('accepts an object with `text` and a `publicId`', () => {
      expect(compileParameter('underlay', {
        text: 'Hello World',
        publicId: 'default_style'
      })).toBe('u_text:default_style:Hello%20World')
    })
    it('accepts an object with `text` and text caption options', () => {
      expect(compileParameter('underlay', {
        text: 'Hello World',
        fontFamily: 'Times New Roman',
        fontSize: '16',
      })).toBe('u_text:Times%20New%20Roman_16:Hello%20World')
      expect(compileParameter('underlay', {
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
      })).toBe('u_text:verdana_18_bold_italic_underline_center_stroke_letter_spacing_4_line_spacing_3.3:Flowers')
      expect(compileParameter('underlay', {
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
      })).toBe('u_text:Arial_12_left_letter_spacing_2_line_spacing_1.5:Bananas')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('underlay', 78)).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('underlay', {text: 'No fontFamily', fontSize: 12})).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('underlay', {
        text: 'No fontSize',
        fontFamily: 'Arial'
      })).toThrowErrorMatchingSnapshot()
    })
  })

  describe('defaultImage', () => {
    it('accepts any public id with a file extension', () => {
      expect(compileParameter('defaultImage', 'image_1.jpg')).toBe('d_image_1.jpg')
      expect(compileParameter('defaultImage', 'image+a-char.png')).toBe('d_image+a-char.png')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('defaultImage', 'noExtension')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('defaultImage', 'badExtension.abc')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('delay', () => {
    it('accepts a positive number', () => {
      expect(compileParameter('delay', 30)).toBe('dl_30')
    })
    it('accepts a numeric string', () => {
      expect(compileParameter('delay', '30')).toBe('dl_30')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('delay', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('delay', '-10')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('delay', -10)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('color', () => {
    it('accepts a color string', () => {
      expect(compileParameter('color', 'green')).toBe('co_green')
      expect(compileParameter('color', '#204')).toBe('co_rgb:204')
      expect(compileParameter('color', '#204f')).toBe('co_rgb:204f')
      expect(compileParameter('color', '#2040fa')).toBe('co_rgb:2040fa')
      expect(compileParameter('color', 'rgb:2040fa')).toBe('co_rgb:2040fa')
      expect(compileParameter('color', 'rgb:2040faf0')).toBe('co_rgb:2040faf0')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('color', '#30')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('color', '#3020f')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('color', '#3020ff2')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('color', '#3020ff2ff')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('colorSpace', () => {
    it('accepts predefined values', () => {
      expect(compileParameter('colorSpace', 'srgb')).toBe('cs_srgb')
      expect(compileParameter('colorSpace', 'tinysrgb')).toBe('cs_tinysrgb')
      expect(compileParameter('colorSpace', 'no_cmyk')).toBe('cs_no_cmyk')
    })
    it('accepts `cs_icc:(public_id)` values', () => {
      expect(compileParameter('colorSpace', 'icc:some_id.icc')).toBe('cs_icc:some_id.icc')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('colorSpace', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('colorSpace', 'bad:some_id')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('colorSpace', 'cs_icc:no_extension')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('dpr', () => {
    it('accepts a positive number', () => {
      expect(compileParameter('dpr', 3)).toBe('dpr_3')
    })
    it('accepts a numeric string', () => {
      expect(compileParameter('dpr', '2.0')).toBe('dpr_2.0')
    })
    it('accepts the value `auto`', () => {
      expect(compileParameter('dpr', 'auto')).toBe('dpr_auto')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('dpr', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('dpr', -1)).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('dpr', 0)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('page', () => {
    it('accepts a positive number', () => {
      expect(compileParameter('page', 3)).toBe('pg_3')
    })
    it('accepts a numeric string', () => {
      expect(compileParameter('page', '20')).toBe('pg_20')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('page', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('page', -1)).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('page', 0)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('density', () => {
    it('accepts a positive number up to 300', () => {
      expect(compileParameter('density', 10)).toBe('dn_10')
      expect(compileParameter('density', 300)).toBe('dn_300')
    })
    it('accepts a numeric string', () => {
      expect(compileParameter('density', '20')).toBe('dn_20')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('density', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('density', 301)).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('density', -1)).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('density', 0)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('flags', () => {
    it('accepts a valid value', () => {
      expect(compileParameter('flags', 'any_format')).toBe('fl_any_format')
      expect(compileParameter('flags', 'attachment')).toBe('fl_attachment')
    })
    it('accepts an array of valid values', () => {
      expect(compileParameter('flags', ['clip_evenodd', 'cutter', 'force_strip'])).toBe('fl_clip_evenodd.cutter.force_strip')
    })
    it('accepts a string of `.` separated values', () => {
      expect(compileParameter('flags', 'layer_apply.lossy.no_overflow')).toBe('fl_layer_apply.lossy.no_overflow')
    })
    it('throws when invalid', () => {
      expect(() => compileParameter('density', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('density', ['any_format', 'bad'])).toThrowErrorMatchingSnapshot()
      expect(() => compileParameter('density', 'attachment.bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('invalid parameters', () => {
    it('throws an error', () => {
      try {
        compileParameter('abc', 'def')
      } catch (error) {
        expect(error.message).toBe(`Cloudinary Image :: unknown transform parameter provided: 'abc'`)
        return
      }
      throw new Error('compileParameter should have thrown')
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
