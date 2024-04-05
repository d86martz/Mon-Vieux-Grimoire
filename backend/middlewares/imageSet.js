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
    const fileName = file.originalname.split(' ').join('_').replace('.' + extension, ('_') + Date.now() + '.webp')
    callback(null, fileName)
  }
})

const imageEdit = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  sharp(req.file.path)
    .resize({ width: 206, height: 260 })
    .toFormat('webp')
    .webp({quality: 90})
    .toBuffer()
    .then(buffer => {
      fs.writeFile(`images/${req.file.filename}`, buffer, (err) => {
        if (err) {
          return next(err);
        }
      })
        next();
    })
    .catch((err) => {
      next(err);
    })
}

module.exports = (req, res, next) => {
  multer({ storage: storage }).single('image')(req, res, (err) => {
    if (err) {
      return next(err);
    }
    imageEdit(req, res, next);
  });
};

module.exports.delete = (imagePath) => {
  const imageName = imagePath.split('/').pop();
  fs.unlink(`images/${imageName}`, (err) => {
    if (err) {
      retun(err)
    }
  })
} 