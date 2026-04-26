const http = require("http");
const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', expressHbs.engine({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}))
app.set('view engine', 'hbs');
app.set('views', 'views');

const adminRouter = require('./routes/adminRoute');
const shopRouter = require('./routes/shopRoute');




app.use('/admin', adminRouter.routes);
app.use('/', shopRouter);






http.createServer(app).listen(3001, ()=> {console.log("server run by port 3001!!")})