const http = require('http');
const express = require('express');
const bodyParse = require('body-parser');
const path = require('path');
// const hbsHandeler = require('express-handlebars')


const app = express();

app.use(bodyParse.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const adminRouter = require('./routers/adminRouter');
const shopRouter = require('./routers/shopRouter');
const errorController = require('./controllers/error')

// app.engine('hbs', hbsHandeler.engine({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use(errorController.pageNotFound)

http.createServer(app).listen(3003, ()=> {console.log("Node js server created PORT 3003")})

