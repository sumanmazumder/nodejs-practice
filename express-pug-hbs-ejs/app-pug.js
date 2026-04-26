const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const bodyParse = require('body-parser');

const productRouter = require('./routes/adminRoute');
const shopRouter = require('./routes/shopRoute');

app.use(bodyParse.urlencoded({ extended: true })); // Body data convert to the javascript object
app.use(express.static(path.join(__dirname, 'public'))); // global css

app.use('/admin', productRouter.routes);
app.use('/', shopRouter);

app.set('view engine', 'pug');
app.set('views', 'views');

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
})


http.createServer(app).listen(3001, () => { console.log('Express server running !! 3001 PORT') })