const { error } = require('console');
const fs = require('fs');
const path = require('path');

const requestRouter = (req, res) => {
    const url = req.url
    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' }); // tell the browser this an HTML document;
        res.write('<h1>Welcome to my Node.js server!</h1>');
        res.write('<form action="/product" method="POST"><input type="text" name="title" /> <button type="submit">Submit</button></form>')
        res.end();
    }
    else if (url === '/product') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const body = [];
        res.write('<h1>Welcome to the product page!</h1>');
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody.split('=')[1]);
            fs.writeFileSync('product.text', parseBody.split('=')[1], error => {
                if (error) {
                    res.write('<h1>Internal Server Error</h1>');
                    res.setHead(500, { 'Content-Type': 'text/html' });
                    res.setHeader('Location', '/');
                    console.error('Error writing to file:', error);
                    res.end();
                }
            });
        });
        res.end();
    }
    else if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Welcome to the about page!</h1>');
        res.end();
    }
}

exports.requestRouter = requestRouter;