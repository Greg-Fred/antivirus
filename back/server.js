const http = require('http');
const app = require('./app');
const ngrok = require('ngrok');

app.set('port', process.env.PORT || 3000 );
const server = http.createServer(app);

server.listen(process.env.PORT || 3000 );

// ngrok.connect({
//   proto: 'http',
//   addr: process.env.PORT,
// }, (err, url) => {
//   if (err) {
//     console.error('Error while connecting Ngrok', err);
//     return new Error('Ngrok Failed');
//   }
// });



