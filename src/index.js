import configureUrlBuilder from './urlBuilder'
import socialUrlBuilder from './socialUrlBuilder'
import fetchUrlBuilder from './fetchUrlBuilder'
import imageParameters from './imageParameters'
import videoParameters from './videoParameters'

export default function Cloudinary(options, defaultTransforms) {
  const urlBuilder = configureUrlBuilder(options)
  const imageUrlBuilder = urlBuilder('image', imageParameters, defaultTransforms.image)

  this.video = urlBuilder('video', videoParameters, defaultTransforms.video)('upload')
  this.image = imageUrlBuilder('upload')
  this.fetch = fetchUrlBuilder(imageUrlBuilder)
  this.social = socialUrlBuilder(imageUrlBuilder)
}
