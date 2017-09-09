import configureUrlBuilder from './urlBuilder'
import imageParameters from './parameters/image'
import videoParameters from './parameters/video'

export default function cloudinary(options, defaultTransforms = {}) {
  const urlBuilder = configureUrlBuilder(options)
  const imageUrlBuilder = urlBuilder(imageParameters, defaultTransforms.image)
  return {
    video: urlBuilder(videoParameters, defaultTransforms.video)('upload'),
    image: imageUrlBuilder('upload'),
  }
}
