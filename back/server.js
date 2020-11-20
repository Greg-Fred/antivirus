const http = require('http');
const app = require('./app');
const ngrok = require('ngrok');

const nomrmalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false
};
const port = nomrmalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall != 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe' + address : 'port ' + port;
  console.log('listening on ' + bind);
});

server.listen(port);


// ngrok.connect({
//   proto: 'http',
//   addr: process.env.PORT
// }, (err, url) => {
//   if (err) {
//     console.error('Error while connecting Ngrok', err);
//     return new Error('Ngrok Failed');
//   } else  {
//     console.log('Tunnel Created -> ', url);
//     console.log('Tunnel Inspector ->  http://127.0.0.1:4040');
//   }
// });


// pour checker les erreurs unhandledRejection (catch error manquant, )
process.on('unhandledRejection', function (reason, p) {
  console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
  // application specific logging here
});

