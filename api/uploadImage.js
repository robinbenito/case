// Here we require a file that is not checked in, so
// ignore this error
/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import { RNS3 } from 'react-native-aws3'
import * as mime from 'react-native-mime-types'
import config from '../config'

export default function (filePath) {
  const file = {
    uri: filePath,
    type: mime.lookup(filePath),
    name: filePath.replace(/^.*[\\/]/, ''),
  }

  const options = {
    bucket: config.S3_BUCKET,
    accessKey: config.S3_ACCESS_KEY,
    secretKey: config.S3_SECRET_KEY,
    region: 'us-east-1',
  }

  return new Promise((resolve, reject) => {
    RNS3.put(file, options).then((response) => {
      if (response.status !== 201) {
        return reject('Failed to upload file')
      }
      return resolve(response.body.postResponse)
    })
  })
}
