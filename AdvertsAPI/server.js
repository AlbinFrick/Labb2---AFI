const http = require('http');
const app = require('./api/app');

const port = process.env.PORT;

const server = http.createServer(app);

server.listen(port, () => {
    console.log("Server is listening on " + port + "...");
});