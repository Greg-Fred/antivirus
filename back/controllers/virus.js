const Virus = require('../models/virus');
const User = require('../models/user');
const cloudinary = require('../middleware/cloudinary');


exports.uploaders = async (req, res) => {
  try {
    // Récupération de la taille du fichier
    const fileSize = req.file.size;
    // Récupération du nom du fichier
    const virusName = req.file.originalname.split(' ').join('_');
    // Récupération de l'user Id
    const userId = req.body.userId;
      // Envoyer à cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
      // Créer nouveau virus
    let virus = new Virus({
      name: virusName,
      user: userId,
      size: fileSize,
      cloudinary_id: result.public_id,
    });
    // Save virus
    await virus.save();
    // Rajoute l'id du virus dans l'instance du user actuel
    User.findOne({ _id: userId })
      .then(user => {
        user.virus.push(virus);
        user.save();
        console.log(user);
      });
    res.json(virus);
  } catch (err) {
    console.log(err);
  }};
