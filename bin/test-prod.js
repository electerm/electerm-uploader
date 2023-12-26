require('dotenv').config()
const FormData = require('form-data')
const fs = require('fs')
const https = require('https')

const {
  UPLOAD_URL_PROD = '/upload',
  PORT_PROD = 443,
  HOST_PROD = 'electerm-upload.html5beta.com',
  TEST_UPLOAD_FILE_PROD
} = process.env

async function uploadFile (filePath) {
  // try {
  const fileStream = fs.createReadStream(filePath)
  const formData = new FormData()
  formData.append('file', fileStream, TEST_UPLOAD_FILE_PROD.split('/').pop())
  const request = https.request({
    method: 'post',
    host: HOST_PROD,
    port: PORT_PROD,
    path: UPLOAD_URL_PROD,
    protocol: 'https:',
    headers: formData.getHeaders()
  })

  formData.pipe(request)

  request.on('response', function (res) {
    console.log(res.statusCode)
  })
}

// Usage: node upload.js <file-path>
const filePath = TEST_UPLOAD_FILE_PROD
uploadFile(filePath)
