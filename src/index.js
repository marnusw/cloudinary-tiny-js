import urlBuilder from './urlBuilder'
import imageParameters from './parameters/image'
// import videoParameters from './parameters/video'

const image = urlBuilder({
  image: imageParameters,
  // video: videoParameters,
})

export default {
  image,
  url: image,
  // video: urlBuilder({video: videoParameters}, 'video'),
}
