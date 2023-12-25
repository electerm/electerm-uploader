require('dotenv').config()
const FormData = require('form-data')
const fs = require('fs')
const http = require('http')

const {
  UPLOAD_URL = '/upload',
  PORT = 34566,
  HOST = '127.0.0.1',
  TEST_UPLOAD_FILE
} = process.env

async function uploadFile (filePath) {
  // try {
  const fileStream = fs.createReadStream(filePath)
  const formData = new FormData()
  formData.append('file', fileStream, 'my-file')
  const request = http.request({
    method: 'post',
    host: HOST,
    port: PORT,
    path: UPLOAD_URL,
    protocol: 'http:',
    headers: formData.getHeaders()
  })

  formData.pipe(request)

  request.on('response', function (res) {
    console.log(res.statusCode)
  })
}

// Usage: node upload.js <file-path>
const filePath = TEST_UPLOAD_FILE
uploadFile(filePath)
