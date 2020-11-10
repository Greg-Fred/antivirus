const multer = require('multer');
const path = require('path');


const multerConfig = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});


module.exports = multerConfig.single("image");

// filtrer en fontion de la taille du fichier
// et faire passer le message d'erreur à la vue
