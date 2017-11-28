import uploadImage from '../api/uploadImage'

export default (image) => {
  if (!image) return Promise.resolve()
  return uploadImage(image)
}
