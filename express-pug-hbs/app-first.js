const fs = require('fs');
fs.writeFileSync('hello.txt', 'Hello World');
const data = fs.readFileSync('hello.txt', 'utf-8');
console.log(data);
