const User = require('../models/user');
const Virus = require('../models/virus');
const moment = require('moment');

//REMARQUE : Il peut être bon de récupérer un délai pour que l'utilisateur
// puisse savoir combien de temps il a à attendre.
// Je m'en occupe pour la prochaine fois.


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
  if (moment.utc(moment(dateDuJour).diff(moment(dateDuVirus))).format("HH") <= basicLimitations.uploadTimeout) {
    return true;
  } else {
    return false;
  }
};


/* METHODE virusPerDayLimitation :
C'est la fonction appelé pour vérifier la limite d'upload par jour, dans le cas ou l'utilisateur est un utilisateur basic.
Elle s'occupe d'extraire la liste des virus à partir de l'id de l'utilisateur à laquelle elle va appliquer la méthode de filtrage (filtrageDesDates) qui lui renverra true ou false en fonction des conditions désirées.
*/
const virusPerDayLimitation = async (id) => {
  try {
    const virusList = await Virus.find({ user: id });
    const virusDujour = virusList.filter(filtrageDesDates);
    if (virusDujour.length >= basicLimitations.perDayupload) {
      // REMARQUE ! on peut implémenter ici un compteur pour le prochain upload
      return false;
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
  const user = await User.findById(req.body.userId);
  if (user.role === "pro") {
    console.log('Utilisateur pro est dans la place !');
    return next();
  }
  try {
    const virusUploadLimit = await virusPerDayLimitation(req.body.userId);
    if (virusUploadLimit === false) {
      res.status(401).json({ message: 'Vous avez atteind votre limite d`upload' });
    } else if (req.file.size > basicLimitations.size) {
      res.status(401).json({message: 'Vous n`êtes pas autorisé à envoyé des fichiers de cette taille !'});
      } else {
        console.log('Validation user Basic est passé !');
        next();
      }
    } catch (error) {
      res.status(500).json({error});
      }
    };

