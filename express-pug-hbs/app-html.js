const http = require('http');
const express = require('express');
const router = require('./router');
const fs = require('fs');
const path = require('path');

const app = express();
const bodyParse = require('body-parser');
app.use(bodyParse.urlencoded({extended: false})); // use for Express body data convert to the Javascript object

const adminRouter = require('./routes/adminRoute');
const shopRouter = require('./routes/shopRoute');

app.use(shopRouter);
app.use('/admin', adminRouter);

app.use((req, res, next) => {
    res.status(400).sendFile(path.join(__dirname, 'views', '404.html'));
})
http.createServer(app).listen(3001, () => {console.log('Server is running on port 3001') });