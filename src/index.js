import configureUrlBuilder from './urlBuilder'
import socialUrlBuilder from './socialUrlBuilder'
import fetchUrlBuilder from './fetchUrlBuilder'
import imageParameters from './imageParameters'
import videoParameters from './videoParameters'

export default function cloudinary(options, defaultTransforms = {}) {
  const urlBuilder = configureUrlBuilder(options)
  const imageUrlBuilder = urlBuilder(imageParameters, defaultTransforms.image)
  return {
    video: urlBuilder(videoParameters, defaultTransforms.video)('upload'),
    image: imageUrlBuilder('upload'),
    fetch: fetchUrlBuilder(imageUrlBuilder),
    social: socialUrlBuilder(imageUrlBuilder),
  }
}
