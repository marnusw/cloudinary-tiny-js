export default (imageUrlBuilder) => {
  const imageFetchUrl = imageUrlBuilder('fetch')
  return (remoteUrl, transform) => imageFetchUrl(encodeURIComponent(remoteUrl), transform)
}
