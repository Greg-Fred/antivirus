const User = require('../models/user');
const Virus = require('../models/virus');
const moment = require('moment'); // Le module moment permet une utilisation plus souple du système de date


/* COMMENTAIRE : Notre système de vérification des limitations d'upload de fichier en fonction du role utilisateur.
  On va laisser les commentaires de fred qui tente d'expliquer son code.
*/

/* BasicLimitations :
Simplement un objet dans lequel je stock les valeurs des restrictions qui sont ensuite
utilisé dans les méthodes de validation.
On peut régler 3 paramètres : La taille, le nombre d'upload par 24h, et la durée de limitation (24h ici).
Les valeurs sont dans le .env, on récupère ensuite les valeurs avec un "simple" : basicLimitation.size par exemple.
*/
const basicLimitations = {
  size: parseInt(process.env.BASIC_SIZE_LIMITATION),
  perDayupload: parseInt(process.env.BASIC_DAY_LIMITATION),
  uploadTimeout: parseInt(process.env.BASIC_TIMEOUT_LIMIT)
};


/* METHODE filtrageDesDates :
On filtre ici l'array de virus récupéré de l'utilisation.
La methode filtreDesDates va vérifier l'écart, en heure, entre la date d'aujourdhui et la date de l'upload de chacun des virus.
Si l'écart est inférieur à 24h, il sera selectionné par la méthode, sinon il sera ejecté.
Le but étant par la suite de vérifier la longueur du tableau renvoyé par la methode filter. Si le nombre atteind 3, c'est que l'utilisateur Basic a atteind sa limite d'upload pour un temps.
J'utilise un module "moment.js" pour faciliter la gestion des formats.
*/
const filtrageDesDates = (virus) => {
  const dateDuJour = moment(Date.now()).format();
  const dateDuVirus = moment(virus.post_date).format();
  const lastUploadTime = moment.utc(moment(dateDuJour).diff(moment(dateDuVirus))).format("HH");
  if (lastUploadTime <= basicLimitations.uploadTimeout) {
    return {
      virus: virus,
      timed: lastUploadTime
    };
  } else {
    return false;
  }
};

//


/* METHODE virusPerDayLimitation :
C'est la fonction appelé pour vérifier la limite d'upload par jour, dans le cas ou l'utilisateur est un utilisateur basic.
Elle s'occupe d'extraire la liste des virus à partir de l'id de l'utilisateur à laquelle elle va appliquer la méthode de filtrage (filtrageDesDates) qui lui renverra true ou false en fonction des conditions désirées.
*/
const virusPerDayLimitation = async (id) => {
  try {
    const virusList = await Virus.find({ user: id });
    const virusDujour = virusList.map(filtrageDesDates);
    // lastUpload selectionne le plus ancien des virus upload et récupère le temps qu'il reste pour atteindre 24h depuis son upload. Libérant ainsi une place pour un nouvel upload.
    const timeBeforeNextUpload = 24 - Math.min.apply(null, virusDujour.map(virus => virus.timed));
    if (virusDujour.length >= basicLimitations.perDayupload) {
      // Du coup, pour remonter l'info je dois renvoyer un objet avec le nombre d'heure restante, ce qu'on trouve dans le timed.
      return {
        response: false,
        timed: timeBeforeNextUpload
      };
    } else {
      return true;
    }
  } catch (error) {
    console.log('error');
    throw error;
  }
}


/* La methode de validation.
Je regarde le role de l'user, si il est pro il passe avec un next().
Sinon je passe tout ça dans la méthode virusPerDayLimitation qui renvoie un boolean.
Ensuite je fais un if/elsif/else pour vérifier :
1. Que la personne n'a pas atteind son quota journalier
2. Que la taille ne dépasse pas la limite
3. Et le else pour dire que c'est ok on passe à la suite.
*/
module.exports = async (req, res, next) => {
  console.log("dans la validation");
  console.log(req.body);
  const user = await User.findOne({ _id: req.body.userId });
  console.log(user);
  req.body.user = user;
  if (user.role === "pro") {
    console.log('Utilisateur pro est dans la place !');
    return next();
  }
  try {
    console.log("dans le try de la validation");
    const virusUploadLimit = await virusPerDayLimitation(user._id);
    console.log(req.file);
    // Vu que j'ai modifié le return avec un objet je dois ici pour retrouver le bouleen, c'est poussif mais ça marche.
    if (virusUploadLimit.response === false) {
      // ce qui me permet ici de récupérer dans l'objet le nombre d'heure restante. Que j'affiche dans la réponse au client.
      res.status(401).json({ message: `Vous avez atteind votre limite d'upload. Upload libre dans ${parseInt(virusUploadLimit.timed, 10)} heures` });
    } else if (req.file.size > basicLimitations.size) {
      res.status(401).json({ message: 'Vous n`êtes pas autorisé à envoyé des fichiers de cette taille !' });
    } else {
      console.log('Validation user Basic est passé !');
      next();
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

