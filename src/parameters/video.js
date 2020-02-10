const validate = {}

const urlParameters = {}

export default function compileVideoParameter(parameter, value) {
  switch (
    parameter
    // no default
  ) {
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!validate[parameter]) {
      throw new Error(`Cloudinary Video :: unknown transform parameter provided: '${parameter}'`)
    }
    validate[parameter](value)
  }

  return urlParameters[parameter] + value
}
