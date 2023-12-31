require('dotenv').config()
const express = require('express')
const multer = require('multer')

const {
  UPLOAD_URL = '/upload',
  SAVE_FOLDER = '/Users/home/dev/electerm-uploader/temp',
  PORT = 34566,
  HOST = '127.0.0.1'
} = process.env

// Set up the multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, SAVE_FOLDER) // Specify the destination folder for storing the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname) // Use the original filename for storing the file
  }
})

// Create an instance of the multer middleware
const upload = multer({
  storage,
  limits: {
    fileSize: 400 * 1024 * 1024
  }
})

// Create an Express app
const app = express()

// Define a route for file uploads
app.all(UPLOAD_URL, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.')
  }

  res.send('File uploaded successfully.')
})

app.get('/test', (req, res) => {
  res.send('ok.')
})

// Start the server
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})
