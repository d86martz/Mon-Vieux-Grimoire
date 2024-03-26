const multer = require('multer');
const sharp = require('sharp')
const fs = require('fs')

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
    const name = file.originalname.split(' ').join('_')
    const extension = MIME_TYPES[file.mimetype]
    callback(null, name + '_' + Date.now() + '.' + extension)
  }
})

const imageUpload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
      if (MIME_TYPES[file.mimetype]) {
          callback(null, true)
      } else {
          callback(new Error('Type de fichier invalide !'))
      }
  }
}).single('image')

const imageFormat = (req, res, next) => {
  if(!req.file) {
    return next();
  };
  sharp(req.file.path) 
    .resize({
      width: 160,
      height: 260,
    })
    .webp({ quality: 80 })
    .toFile(`${req.file.path.split('.')[0]}.webp`)
    fs.unlink(req.file.path, () => {})
}

const imageDelete = (req, res, next) => {
  if(!req.file) {
    return next();
  };
  const fileName = imageUrl.split("/")[1];
  fs.unlink(req.file.path, () => {})
}

module.exports = imageUpload, imageFormat, imageDelete
