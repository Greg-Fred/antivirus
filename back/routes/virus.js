const express = require('express');
const router = express.Router();
const virusCtrl = require('../controllers/virus');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const validation = require('../middleware/validation');

/* La route qui s'occupe d'uploader les fichiers.
Lui est appliqué une authentification d'utilisateur,
multer qui extrait le fichier (file) de la requête et qui permet son utilisation (mais multer est capable de plus, nous vérifions d'ailleurs le format des fichiers dans ce middleware),
le middleware validation permet de gérer les restrictions d'upload lié au role de l'utilisateur.
*/
router.post('/upload', auth, multer, validation, virusCtrl.uploaders);


module.exports = router

