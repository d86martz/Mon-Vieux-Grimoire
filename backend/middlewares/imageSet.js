const multer = require('multer')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp':'webp'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images')
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype]
    const fileName = file.originalname.split(' ').join('_').replace('.' + extension, ('_') + Date.now() + '.' + extension)
    callback(null, fileName)
  }
})

const imageUpload = multer({storage: storage}).single('image')

const imageEdit = () => {
  console.log()
  if(!file) return
//   sharp(req.file) 
//   .resize({
//     width: 160,
//     height: 260,
//   })
//   .webp({ quality: 20 })
//   .toFile('../images/')
//   fs.unlink(req.file)
}

const imageDelete = (imageUrl) => {
  const filename = imageUrl.split('/images/')[1]
  const imagePath = path.join(__dirname, '..', 'images', filename)
  fs.unlink(imagePath)
}

// function test() {console.log('test')}
const toto1 = () => {
  console.log("test")
}

module.exports = toto1, imageUpload, imageEdit, imageDelete
