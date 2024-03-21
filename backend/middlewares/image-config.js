const multer = require('multer');
const sharp = require("sharp");

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp':' webp'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

const uploadImage = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
      if (MIME_TYPES[file.mimetype]) {
          callback(null, true),
          sharp()
            .resize({ width: 463, height: 595 })
            .webp({ quality: 20 })
            .toFile('../images')
      } else {
          callback(new Error('Type de fichier invalide !'))
      }
  },
}).single('image')

module.exports = uploadImage
