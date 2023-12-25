import multer from "multer";

// Stockage des fichiers venant du client dans dossier public/assets du server
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
    });


const upload = multer({ storage: storage }).single("picture");

// NOTES https://bobbyhadz.com/blog/javascript-requested-module-not-provide-export-named
export default upload;
