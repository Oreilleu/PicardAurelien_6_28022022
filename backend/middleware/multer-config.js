const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/bmp': 'bmp',
    'image/svg+xml': 'svg',
    'image/webp': 'webp'
};

// Créé le nom de l'image et l'enregistre sur le serveur
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extention = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '_' + extention);
    }
});

module.exports = multer({storage: storage}).single('image');