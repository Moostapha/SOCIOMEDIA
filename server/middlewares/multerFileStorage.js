import multer from "multer";

// Stockage des fichiers venant du client dans dossier public/assets du server
const fileStorage = multer.diskStorage({ 
    destination: function(req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
const multerUploadFile = multer({ fileStorage });

module.exports = multerUploadFile.single('picture');

// https://github.com/expressjs/multer
// https://www.npmjs.com/package/multer => diskstorage
// https://climbtheladder.com/10-multer-best-practices/
