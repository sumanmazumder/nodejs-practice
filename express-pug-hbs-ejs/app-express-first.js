const http = require('http');
const express = require('express');
const router = require('./router');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({extended: true})); //Converts form data into a usable JavaScript object


app.get('/add-product', (req, res, next) => {
    console.log('Middleware 2');
    res.send(`<h1>Welcome to the product page!</h1>
        <form action="/product" method="POST"><input type="text" name="title" /> <button type="submit">Submit</button></form>`);
    // next();
    res.end();
})
app.post('/product', (req, res, next) => {
    console.log('Middleware 3 - Product POST');
    console.log('Form data received:', req.body.title);
    // res.redirect('/');
    fs.writeFile('abc.txt', req.body.title, error => {
        if (error) {
            res.writeHead(302, { 'content-type': 'text/html', 'Location': '/' });
            res.setHeader({ 'Content-Type': 'text/html' });
            console.error('Error writing to file:', error);
            res.end();
        }
    })
})
app.get('/', (req, res, next) => {
    console.log('Middleware 1');
    res.send('<h1>Welcome to my Express server!</h1>');
})

http.createServer(app).listen(3001, () => { console.log('Server is running on port 3001') });