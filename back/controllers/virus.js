const Virus = require('../models/virus');
const User = require('../models/user');
const cloudinary = require('../middleware/cloudinary');
const { catchAsync, AppError } = require('../lib/AppError');

/* Ce controlleur s'occupe d'upload les fichiers sur cloudinary et d'enregistrer en DB un nouveau virus,
  il s'occupe également de pousser le virus dans l'instance de l'utilisateur, faisant ainsi le lien entre leur relation OneToMany
*/

const uploaders = catchAsync(async (req, res, next) => {
  const fileSize = req.file.size;
  const virusName = req.file.originalname.split(' ').join('_');
  const userId = req.body.userId;
  const user = await User.findOne({ _id: userId });
  const result = await cloudinary.uploader.upload(req.file.path);
  const virus = new Virus({
    name: virusName,
    user: userId,
    size: fileSize,
    cloudinary_id: result.public_id,
  });
  await virus.save();
  user.virus.push(virus);
  await user.save();
  res.status(201).json({ message: 'Virus créé !', virus: virus });
});

module.exports = { uploaders };
