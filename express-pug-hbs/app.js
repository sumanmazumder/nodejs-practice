const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();


const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

const adminRouter = require('./routes/adminRoute');
const shopRouter = require('./routes/shopRoute');

app.use('/admin', adminRouter.routes);
app.use('/', shopRouter);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next)=> {
    res.status(404).render('404', {pageTitle: 'Page Not Found', path: ''});
})

http.createServer(app).listen(3001, ()=> {console.log("server run by port 3001!!")})