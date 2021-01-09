const Virus = require('../models/virus');
const User = require('../models/user');
const cloudinary = require('../middleware/cloudinary');
const { catchAsync, AppError } = require('../lib/AppError');

/* Ce controlleur s'occupe d'upload les fichiers sur cloudinary et d'enregistrer en DB un nouveau virus,
  il s'occupe également de pousser le virus dans l'instance de l'utilisateur, faisant ainsi le lien entre leur relation OneToMany
*/

const uploaders = catchAsync(async (req, res, next) => {
  console.log('dans le uploader');
  console.log(req.body);
  console.log('req.file' + req.file);
  console.log("le fichier ressemble à :");
  console.log(req.file);
  console.log("LEXTANSION EST :");
  console.log(req.file.mimetype.split('/')[1]);
  const fileType = req.file.mimetype.split('/')[1];
  const fileSize = req.file.size;
  const virusName = req.file.originalname.split(' ').join('_');

  const user = await User.findOne({ email: req.body.user.email });
  const reportStatus = (Math.round(Math.random() * (10 - 1)) + 1) > 6 ? "infected" : "valid" ;
  // const result = await cloudinary.uploader.upload(req.file.path);
  const virus = new Virus({
    name: virusName,
    user: user._id,
    size: fileSize,
    report: reportStatus,
    mimetype: fileType
  });
  await virus.save();
  user.virus.push(virus);
  await user.save();
  console.log('Virus créé : ' + virus);
  res.status(201).json({ message: 'Virus créé !', virus: virus });
});

module.exports = { uploaders };
