const http = require('http');
const path = require('path');
const express = require('express');
const bodyParse = require('body-parser');

const app = express();

const adminRouter = require('./routers/adminRouter');
const shopRouter = require('./routers/shopRouter');
const errorController = require('./controllers/errorController');
const sequelize = require('./utils/database');
const User = require('./modules/userModule');
const Product = require('./modules/product');
const Cart = require('./modules/cartModule');
const CartItem = require('./modules/cartItemModule');



app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParse.urlencoded({ extended: false }));

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(errorController.error404);

// Realtion create in database
User.hasMany(Product);
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasOne(Cart);
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

app.use((req, res, next)=> {
    User.findById(1).then(result => {
        req.user = result;
        next();
    }).catch(err=> {
        console.log(err);
    })
})


app.set('view engine', 'ejs');
app.set('views', 'views');




sequelize
    .sync({ force: true })
    // .sync()
    .then(user => {
        if (!user) {
            return User.create({ name: 'Max', email: 'test@test.com' })
        }
        else {
            return user;
        }
    })
    .then(user => {
        return user.createCart();
    })
    .then(cart => {
        http.createServer(app).listen(3005, () => { console.log("Node server start 3005") })

    }
    ).catch(err => { console.log(err) })