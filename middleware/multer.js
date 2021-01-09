const multer = require('multer');
const path = require('path');

// VERSION AVEC FILTRAGE DU TYPE
// const multerConfig = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     let ext = path.extname(file.originalname);
//     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//       cb(new Error("File type is not supported"), false);
//       return;
//     }
//     cb(null, true);
//   },
// });

const multerConfig = multer({
  storage: multer.diskStorage({})
});


module.exports = multerConfig.single("image");

