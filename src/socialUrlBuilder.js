import { invariantSocial as invariant, includes, shouldBeOneOf } from './utils'

const supportedNetworks = ['facebook', 'twitter', 'twitterName', 'instagram', 'instagramName', 'gplus', 'gravatar']

const validateNetwork = network => invariant(
  includes(network, supportedNetworks),
  'socialOptIn', network, shouldBeOneOf(supportedNetworks)
)

export default (imageUrlBuilder, socialOptIn = []) => (
  (socialOptIn.length ? socialOptIn : supportedNetworks)
    .reduce((acc, network) => {
      process.env.NODE_ENV !== 'production' && validateNetwork(network)
      acc[network] = imageUrlBuilder(network.replace('N', '_n')) // snake case networkName
      return acc
    }, {})
)
