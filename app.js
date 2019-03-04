const http = require('http');

const routes = require('./routes');


// Creating the server
const server = http.createServer(routes);
server.listen(3000);