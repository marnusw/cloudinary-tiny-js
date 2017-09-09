import imageParameter from '../../src/parameters/image'

describe('Image Transform Parameters', () => {
  describe('width', () => {
    it('accepts a number', () => {
      expect(imageParameter('width', 300)).toBe('w_300')
    })
    it('accepts a numeric string', () => {
      expect(imageParameter('width', '300')).toBe('w_300')
    })
    it('accepts `auto`', () => {
      expect(imageParameter('width', 'auto')).toBe('w_auto')
    })
    it('accepts a string starting with `auto:`', () => {
      expect(imageParameter('width', 'auto:50')).toBe('w_auto:50')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('width', 'bad:auto')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('width', 'auto-bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('height', () => {
    it('accepts a number', () => {
      expect(imageParameter('height', 300)).toBe('h_300')
    })
    it('accepts a numeric string', () => {
      expect(imageParameter('height', '300')).toBe('h_300')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('height', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('crop', () => {
    it('accepts valid string values', () => {
      expect(imageParameter('crop', 'scale')).toBe('c_scale')
      expect(imageParameter('crop', 'fill')).toBe('c_fill')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('crop', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('crop', 300)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('aspectRatio', () => {
    it('accepts a number', () => {
      expect(imageParameter('aspectRatio', 1.5)).toBe('ar_1.5')
    })
    it('accepts valid string values', () => {
      expect(imageParameter('aspectRatio', '1.5')).toBe('ar_1.5')
      expect(imageParameter('aspectRatio', '16:9')).toBe('ar_16:9')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('aspectRatio', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('aspectRatio', '7:')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('gravity', () => {
    it('accepts valid string values', () => {
      expect(imageParameter('gravity', 'south_west')).toBe('g_south_west')
      expect(imageParameter('gravity', 'custom:face')).toBe('g_custom:face')
    })
    it('accepts `auto`', () => {
      expect(imageParameter('gravity', 'auto')).toBe('g_auto')
    })
    it('accepts a string starting with `auto:`', () => {
      expect(imageParameter('gravity', 'auto:50')).toBe('g_auto:50')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('gravity', 'bad:auto')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('gravity', 'auto-bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('zoom', () => {
    it('accepts a number', () => {
      expect(imageParameter('zoom', 30)).toBe('z_30')
    })
    it('accepts a numeric string', () => {
      expect(imageParameter('zoom', '30')).toBe('z_30')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('zoom', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('x', () => {
    it('accepts a number', () => {
      expect(imageParameter('x', 100)).toBe('x_100')
    })
    it('accepts a numeric string', () => {
      expect(imageParameter('x', '100')).toBe('x_100')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('x', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('y', () => {
    it('accepts a number', () => {
      expect(imageParameter('y', 100)).toBe('y_100')
    })
    it('accepts a numeric string', () => {
      expect(imageParameter('y', '100')).toBe('y_100')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('y', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('fetchFormat', () => {
    it('accepts valid file formats', () => {
      expect(imageParameter('fetchFormat', 'jpg')).toBe('f_jpg')
      expect(imageParameter('fetchFormat', 'png')).toBe('f_png')
    })
    it('accepts `auto`', () => {
      expect(imageParameter('fetchFormat', 'auto')).toBe('f_auto')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('fetchFormat', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('quality', () => {
    it('accepts a number between 1 an 100 inclusive', () => {
      expect(imageParameter('quality', 1)).toBe('q_1')
      expect(imageParameter('quality', 60)).toBe('q_60')
      expect(imageParameter('quality', 100)).toBe('q_100')
    })
    it('accepts a numeric string', () => {
      expect(imageParameter('quality', '50')).toBe('q_50')
    })
    it('accepts a percentage and chroma sub-sampling', () => {
      expect(imageParameter('quality', '60:420')).toBe('q_60:420')
    })
    it('accepts `auto`, auto variants and `jpegmini`', () => {
      expect(imageParameter('quality', 'auto')).toBe('q_auto')
      expect(imageParameter('quality', 'auto:best')).toBe('q_auto:best')
      expect(imageParameter('quality', 'jpegmini')).toBe('q_jpegmini')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('quality', 0)).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('quality', 105)).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('quality', '105')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('quality', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('quality', 'auto:bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('radius', () => {
    it('accepts a number', () => {
      expect(imageParameter('radius', 30)).toBe('r_30')
    })
    it('accepts a numeric string', () => {
      expect(imageParameter('radius', '30')).toBe('r_30')
    })
    it('accepts a string of the form x[:y[:z[:u]]]', () => {
      expect(imageParameter('radius', '20:0')).toBe('r_20:0')
      expect(imageParameter('radius', '20:0:40')).toBe('r_20:0:40')
      expect(imageParameter('radius', '20:0:40:40')).toBe('r_20:0:40:40')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('radius', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('radius', '20:0:40:40:90')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('angle', () => {
    it('accepts a number', () => {
      expect(imageParameter('angle', 90)).toBe('a_90')
      expect(imageParameter('angle', -20)).toBe('a_-20')
    })
    it('accepts a numeric string', () => {
      expect(imageParameter('angle', '10')).toBe('a_10')
      expect(imageParameter('angle', '-20')).toBe('a_-20')
    })
    it('accepts valid modes', () => {
      expect(imageParameter('angle', 'auto_right')).toBe('a_auto_right')
      expect(imageParameter('angle', 'vflip')).toBe('a_vflip')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('angle', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('effect', () => {
    it('accepts any value', () => {
      expect(imageParameter('effect', 'hue:40')).toBe('e_hue:40')
      expect(imageParameter('effect', 'negate')).toBe('e_negate')
    })
  })

  describe('opacity', () => {
    it('accepts a number between 0 and 100', () => {
      expect(imageParameter('opacity', 0)).toBe('o_0')
      expect(imageParameter('opacity', 30)).toBe('o_30')
      expect(imageParameter('opacity', 100)).toBe('o_100')
    })
    it('accepts a numeric string', () => {
      expect(imageParameter('opacity', '0')).toBe('o_0')
      expect(imageParameter('opacity', '30')).toBe('o_30')
      expect(imageParameter('opacity', '100')).toBe('o_100')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('opacity', -1)).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('opacity', 101)).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('opacity', 'bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('border', () => {
    it('accepts a fully formed width_style_color string', () => {
      expect(imageParameter('border', '4px_solid_black')).toBe('bo_4px_solid_black')
      expect(imageParameter('border', '4px_solid_#2040fa')).toBe('bo_4px_solid_rgb:2040fa')
      expect(imageParameter('border', '4px_solid_rgb:2040fa')).toBe('bo_4px_solid_rgb:2040fa')
      expect(imageParameter('border', '4px_solid_rgb:2040faf0')).toBe('bo_4px_solid_rgb:2040faf0')
    })
    it('accepts a object with color and optional width', () => {
      expect(imageParameter('border', {color: 'red'})).toBe('bo_1px_solid_red')
      expect(imageParameter('border', {color: '#3020ff'})).toBe('bo_1px_solid_rgb:3020ff')
      expect(imageParameter('border', {color: '#3020ff22'})).toBe('bo_1px_solid_rgb:3020ff22')
      expect(imageParameter('border', {color: 'rgb:3020ff'})).toBe('bo_1px_solid_rgb:3020ff')
      expect(imageParameter('border', {color: 'rgb:3020ff22'})).toBe('bo_1px_solid_rgb:3020ff22')
      expect(imageParameter('border', {color: 'red', width: 3})).toBe('bo_3px_solid_red')
      expect(imageParameter('border', {color: '#3020ff', width: '2px'})).toBe('bo_2px_solid_rgb:3020ff')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('border', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('border', {width: 1})).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('border', {color: '#3020f'})).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('border', {color: '#3020ff2'})).toThrowErrorMatchingSnapshot()
    })
  })

  describe('background', () => {
    it('accepts a color', () => {
      expect(imageParameter('background', 'blue')).toBe('b_blue')
      expect(imageParameter('background', '#3020ff')).toBe('b_rgb:3020ff')
      expect(imageParameter('background', '#3020ff22')).toBe('b_rgb:3020ff22')
      expect(imageParameter('background', 'rgb:3020ff')).toBe('b_rgb:3020ff')
      expect(imageParameter('background', 'rgb:3020ff22')).toBe('b_rgb:3020ff22')
    })
    it('accepts valid `auto:mode` strings', () => {
      expect(imageParameter('background', 'auto:border')).toBe('b_auto:border')
      expect(imageParameter('background', 'auto:border_contrast')).toBe('b_auto:border_contrast')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('background', 'auto:bad')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('background', '#3020f')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('overlay', () => {
    it('accepts any string as public id', () => {
      expect(imageParameter('overlay', 'badge')).toBe('l_badge')
      expect(imageParameter('overlay', 'red_button.jpg')).toBe('l_red_button.jpg')
      expect(imageParameter('overlay', 'text:Arial_50:Smile!')).toBe('l_text:Arial_50:Smile!')
      expect(imageParameter('overlay', 'text:default_style:Hello+World')).toBe('l_text:default_style:Hello+World')
    })
    it('accepts an object with `text` and a `publicId`', () => {
      expect(imageParameter('overlay', {
        text: 'Hello World',
        publicId: 'default_style'
      })).toBe('l_text:default_style:Hello%20World')
    })
    it('accepts an object with `text` and text caption options', () => {
      expect(imageParameter('overlay', {
        text: 'Hello World',
        fontFamily: 'Times New Roman',
        fontSize: '16',
      })).toBe('l_text:Times%20New%20Roman_16:Hello%20World')
      expect(imageParameter('overlay', {
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
      expect(imageParameter('overlay', {
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
      expect(() => imageParameter('overlay', {text: 'No fontFamily', fontSize: 12})).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('overlay', {
        text: 'No fontSize',
        fontFamily: 'Arial'
      })).toThrowErrorMatchingSnapshot()
    })
  })

  describe('underlay', () => {
    it('accepts any string as public id', () => {
      expect(imageParameter('underlay', 'badge')).toBe('u_badge')
      expect(imageParameter('underlay', 'red_button.jpg')).toBe('u_red_button.jpg')
      expect(imageParameter('underlay', 'text:Arial_50:Smile!')).toBe('u_text:Arial_50:Smile!')
      expect(imageParameter('underlay', 'text:default_style:Hello+World')).toBe('u_text:default_style:Hello+World')
    })
    it('accepts an object with `text` and a `publicId`', () => {
      expect(imageParameter('underlay', {
        text: 'Hello World',
        publicId: 'default_style'
      })).toBe('u_text:default_style:Hello%20World')
    })
    it('accepts an object with `text` and text caption options', () => {
      expect(imageParameter('underlay', {
        text: 'Hello World',
        fontFamily: 'Times New Roman',
        fontSize: '16',
      })).toBe('u_text:Times%20New%20Roman_16:Hello%20World')
      expect(imageParameter('underlay', {
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
      expect(imageParameter('underlay', {
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
      expect(() => imageParameter('underlay', {text: 'No fontFamily', fontSize: 12})).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('underlay', {
        text: 'No fontSize',
        fontFamily: 'Arial'
      })).toThrowErrorMatchingSnapshot()
    })
  })

  describe('defaultImage', () => {
    it('accepts any public id with a file extension', () => {
      expect(imageParameter('defaultImage', 'image_1.jpg')).toBe('d_image_1.jpg')
      expect(imageParameter('defaultImage', 'image+a-char.png')).toBe('d_image+a-char.png')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('defaultImage', 'noExtension')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('defaultImage', 'badExtension.abc')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('delay', () => {
    it('accepts a positive number', () => {
      expect(imageParameter('delay', 30)).toBe('dl_30')
    })
    it('accepts a numeric string', () => {
      expect(imageParameter('delay', '30')).toBe('dl_30')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('delay', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('delay', '-10')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('delay', -10)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('color', () => {
    it('accepts a color string', () => {
      expect(imageParameter('color', 'green')).toBe('co_green')
      expect(imageParameter('color', '#204')).toBe('co_rgb:204')
      expect(imageParameter('color', '#204f')).toBe('co_rgb:204f')
      expect(imageParameter('color', '#2040fa')).toBe('co_rgb:2040fa')
      expect(imageParameter('color', 'rgb:2040fa')).toBe('co_rgb:2040fa')
      expect(imageParameter('color', 'rgb:2040faf0')).toBe('co_rgb:2040faf0')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('color', '#30')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('color', '#3020f')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('color', '#3020ff2')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('color', '#3020ff2ff')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('colorSpace', () => {
    it('accepts predefined values', () => {
      expect(imageParameter('colorSpace', 'srgb')).toBe('cs_srgb')
      expect(imageParameter('colorSpace', 'tinysrgb')).toBe('cs_tinysrgb')
      expect(imageParameter('colorSpace', 'no_cmyk')).toBe('cs_no_cmyk')
    })
    it('accepts `cs_icc:(public_id)` values', () => {
      expect(imageParameter('colorSpace', 'icc:some_id.icc')).toBe('cs_icc:some_id.icc')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('colorSpace', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('colorSpace', 'bad:some_id')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('colorSpace', 'cs_icc:no_extension')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('dpr', () => {
    it('accepts a positive number', () => {
      expect(imageParameter('dpr', 3)).toBe('dpr_3')
    })
    it('accepts a numeric string', () => {
      expect(imageParameter('dpr', '2.0')).toBe('dpr_2.0')
    })
    it('accepts the value `auto`', () => {
      expect(imageParameter('dpr', 'auto')).toBe('dpr_auto')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('dpr', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('dpr', -1)).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('dpr', 0)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('page', () => {
    it('accepts a positive number', () => {
      expect(imageParameter('page', 3)).toBe('pg_3')
    })
    it('accepts a numeric string', () => {
      expect(imageParameter('page', '20')).toBe('pg_20')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('page', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('page', -1)).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('page', 0)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('density', () => {
    it('accepts a positive number up to 300', () => {
      expect(imageParameter('density', 10)).toBe('dn_10')
      expect(imageParameter('density', 300)).toBe('dn_300')
    })
    it('accepts a numeric string', () => {
      expect(imageParameter('density', '20')).toBe('dn_20')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('density', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('density', 301)).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('density', -1)).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('density', 0)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('flags', () => {
    it('accepts a valid value', () => {
      expect(imageParameter('flags', 'any_format')).toBe('fl_any_format')
      expect(imageParameter('flags', 'attachment')).toBe('fl_attachment')
    })
    it('accepts an array of valid values', () => {
      expect(imageParameter('flags', ['clip_evenodd', 'cutter', 'force_strip'])).toBe('fl_clip_evenodd.cutter.force_strip')
    })
    it('accepts a string of `.` separated values', () => {
      expect(imageParameter('flags', 'layer_apply.lossy.no_overflow')).toBe('fl_layer_apply.lossy.no_overflow')
    })
    it('throws when invalid', () => {
      expect(() => imageParameter('density', 'bad')).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('density', ['any_format', 'bad'])).toThrowErrorMatchingSnapshot()
      expect(() => imageParameter('density', 'attachment.bad')).toThrowErrorMatchingSnapshot()
    })
  })

  describe('null value on any parameter', () => {
    it('returns an empty string', () => {
      expect(imageParameter('crop', null)).toBe('')
    })
  })

  describe('invalid parameter', () => {
    it('throws an error', () => {
      try {
        imageParameter('abc', 'def')
      } catch (error) {
        expect(error.message).toBe(`Cloudinary Image :: unknown transform parameter provided: 'abc'`)
        return
      }
      throw new Error('imageParameter should have thrown')
    })
  })
})
