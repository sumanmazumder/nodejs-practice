const Product = require('../modules/product');
// const CartModule = require('../modules/cartModule');
const CartItem = require('../modules/cartItemModule');

exports.getIndex = (req, res, next) => {
    Product.findAll().then(result => {
        res.render('shop/index', {
            pageTitle: 'Shop',
            path: '/',
            addProductActive: true,
            formCss: true,
            productCss: true,
            product: result
        })
    }).catch(err => { console.log(err) })

}

exports.getProductList = (req, res, next) => {
    Product.findAll().then(result => {
        res.render('shop/product-list', {
            pageTitle: 'Product List',
            path: '/product-list',
            product: result
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.getProductDetails = (req, res, next) => {
    const prodId = req.params.prodId;
    Product.findByPk(prodId).then(product => {
        res.render('shop/product-details', {
            pageTitle: 'Product List',
            path: '/',
            product: product
        })
    }).catch(err => {
        console.log(err);
    })

}

exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then(cartItem=> {
        if(!cartItem) {
            return res.render('shop/cart', { pageTitle: 'Cart Page', path: '/cart', products: [] });
        }
        else {
            return cartItem.getProducts();
        }
    })
    .then(products => {
        if(!products){
            products = [];
        } else {
            
            const cartMap = products.map((p)=> ({
                id: p.id,
                title: p.title,
                imgUrl: p.imgUrl,
                price: p.price,
                description: p.description,
                count: p.CartItem ? p.CartItem.quentity : 1
            }));
            // console.log("Cart List ====>", cartMap);
            const totalPrice = cartMap.reduce((sum, p) => sum + (p.price * p.count), 0);
            // attach totalPrice on array for existing template that expects products.totalPrice
            cartMap.totalPrice = totalPrice;
            res.render('shop/cart', {
                pageTitle: 'Cart Page',
                path: '/cart',
                products: cartMap
            });
        }
    }).catch(err => {
        console.log(err);
    })
    
}

exports.postCart = (req, res, next) => {
    const proId = req.body.prodId;

    let fetchedCart;
    const newQuantity = 1;

    req.user.getCart()
        .then(cart => {
            if (!cart) {
                return req.user.createCart().then(newCart => {
                    fetchedCart = newCart;
                    return fetchedCart;
                });
            }
            fetchedCart = cart;
            return fetchedCart;
        })
        .then(() => {
            return CartItem.findOne({ where: { CartId: fetchedCart.id, ProductId: proId } });
        })
        .then(cartItem => {
            if (cartItem) {
                cartItem.quentity = (cartItem.quentity || 0) + 1;
                return cartItem.save();
            }
            return Product.findByPk(proId).then(product => {
                return fetchedCart.addProduct(product, { through: { quentity: newQuantity } });
            });
        })
        .then(() => {
            // Recalculate cart totalPrice from items
            return fetchedCart.getProducts().then(products => {
                const total = products.reduce((sum, p) => {
                    const qty = p.CartItem ? Number(p.CartItem.quentity) : 1;
                    const price = Number(p.price) || 0;
                    return sum + price * qty;
                }, 0);
                fetchedCart.totalPrice = total;
                return fetchedCart.save();
            });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));

}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    req.user.getCart()
    .then(product => {
        return product.getProducts({where: {id: prodId}})
    })
    .then(item=> {
        return item[0].CartItem.destroy()
    })
    .then(result => {
        console.log("Delete Product Item ====>", result);
        res.redirect('/cart');
    })
    .catch(err => {
        console.log(err);
    })

}

exports.postOrder = (req, res, next) => {
    
}

exports.getOrder = (req, res, next)=> {

    req.user.getCart()
    .then(result => {
        result.getProducts()
    })
    .then(prodict=>{

    })
    .catch(err => {
        console.log(err);
    })
    res.render('shop/order', {
        pageTitle: 'Order',
        path: '/order'
    })
}