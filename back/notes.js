/* Brouillon pour communiquer :

********* Legend de note.js
Pour être clair, quand du texte est écrit entre : | ... | cela renvoie à une commande de terminal.
La commande étant ce qui est écrit entre deux barres => | ... |




++ En cas d'erreur serveur de type :

Error: listen EADDRINUSE: address already in use :::3000

=> Taper | lsof -i:3000 | dans le terminal
  // => COMMAND  PID  USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
        node    6356 fredo   20u  IPv6  61712      0t0  TCP *:3000 (LISTEN)
=> Taper | kill -9 [PID] |
*[PID] correpondant au numéro d'exemple : 6356.
//////////////////////////////////////////

++ Stripe CLI = WEBHOOK

A_ACCOUNT_ID=acct_1HkSdNDXZyAsNyKO

WEBHOOK_SIGNING_SECRET=whsec_GJbuNWKqXkdBbG75c4hcjtM0kARogpll
//////////////////////////////////////////

++NGROK
Installation de NGROCK :

| npm i g -s ngrok |

Ajout de la secret key :

| ngrok authtoken 1kVRSSg04wfmlc0cBA0PENBUHfJ_5B3KMKaRx2b8Vt9J6bNrM |

Pour lancer NGROCK.
1. Lancer dans un premier terminal : | node server.js |
2. Dans un deuxieme terminal lancer ngrock : | ngrok http 3000 |
3. Dans le deuxieme terminal Ngrock propose de nouvelles adresses correspondante au localhost, il suffit d'y aller.

Erreur NGROCK :
dans le cas d'une erreur NGROK de type :

-------------
Your account '****' is limited to 1 simultaneous ngrok client session.
Active ngrok client sessions in region 'us':
  - ts_1kVgp5OMBvCD48AWkyHBy9fPBcX (77.147.12.67)

ERR_NGROK_108
--------------

Tapper dans le terminal la commande : | killall ngrok |
Et relancer la commande | ngrok http 3000 |.
Et voila. Sinon appeler Fredo :D !


SECRET_NGROK_KEY=1kVRSSg04wfmlc0cBA0PENBUHfJ_5B3KMKaRx2b8Vt9J6bNrM
Clé save dans : (retour de terminal)
NGROCK ./ngrok authtoken 1kVRSSg04wfmlc0cBA0PENBUHfJ_5B3KMKaRx2b8Vt9J6bNrM
Authtoken saved to configuration file: /home/fredo/.ngrok2/ngrok.yml
///////////////////////////////////////////


*/
