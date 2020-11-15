/* Brouillon pour communiquer :

++ En cas d'erreur serveur de type :

Error: listen EADDRINUSE: address already in use :::3000

=> Taper | lsof -i:3000 | dans le terminal
  // => COMMAND  PID  USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
        node    6356 fredo   20u  IPv6  61712      0t0  TCP *:3000 (LISTEN)
=> Taper | kill -9 [PID] |
*[PID] correpondant au numéro d'exemple : 6356.

















*/
