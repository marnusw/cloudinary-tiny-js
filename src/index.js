function cloudinary({cloudName, defaultOptions, secure = true}) {
  const base = `http${secure ? 's' : ''}://res.cloudinary.com/${cloudName}/image/upload/`

  return (publicId, options) => {
    options = {...defaultOptions, ...options}

    const extension = options.format ? `.${options.format}` : ''
    delete options.format

    return base + compileTransform(options) + publicId + extension
  }
}

function compileTransform(options) {
  return ''
}
