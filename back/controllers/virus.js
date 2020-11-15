const Virus = require('../models/virus');
const User = require('../models/user');
const cloudinary = require('../middleware/cloudinary');


exports.uploaders = async (req, res, next) => {
  try {
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
    res.status(201).json({ message: 'Virus créé !'})
  } catch (err) {
    res.status(500).json( {err});
  }};
