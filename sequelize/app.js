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
const Order = require('./modules/orderModule');
const OrderItem = require('./modules/orderItemModule');



app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParse.urlencoded({ extended: false }));

// attach a user instance to each request (ensure exists)
app.use((req, res, next)=> {
    User.findByPk(1).then(user => {
        if (!user) {
            return User.create({ name: 'Max', email: 'test@test.com' }).then(newUser => {
                req.user = newUser;
                next();
            });
        }
        req.user = user;
        next();
    }).catch(err=> {
        console.log(err);
        next();
    })
})

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
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem} );





app.set('view engine', 'ejs');
app.set('views', 'views');




sequelize
    // .sync({force: true})
    // Use alter to update database schema without dropping tables
    .sync({ alter: true })
    .then(result=> {return User.findByPk(1)})
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