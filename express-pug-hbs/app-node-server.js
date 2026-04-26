const http = require('http');
const fs = require('fs');
const router = require('./router');

const server = http.createServer(router.requestRouter);

server.listen(3001, () => {console.log('Server is running on port 3001')})