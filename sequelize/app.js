const http = require('http');
const path = require('path');
const express = require('express');
const bodyParse = require('body-parser');

const app = express();

const adminRouter = require('./routers/adminRouter');
const shopRouter = require('./routers/shopRouter');
const errorController = require('./controllers/errorController');
const sequelize = require('./utils/database');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParse.urlencoded({extended: false}));

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(errorController.error404);

app.set('view engine', 'ejs');
app.set('views', 'views');

sequelize.sync().then( result=>
    http.createServer(app).listen(3005, ()=> {console.log("Node server start 3005")})
).catch(err=> {console.log(err)})