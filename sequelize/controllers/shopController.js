const Product = require('../modules/product');
const CardModule = require('../modules/cartModule');

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
    

    res.render('shop/cart', {
        pageTitle: 'Cart Page',
        path: '/cart',
        products: products
    });
}

exports.postCart = (req, res, next) => {
    const proId = req.body.prodId;
   


    res.redirect('/cart');

}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    // Find the product price from the cart as a fallback if product lookup fails
    // CardModule.getCart(cart => {
    //     if (!cart || !cart.products) {
    //         return res.redirect('/cart');
    //     }
    //     const cartProduct = cart.products.find(p => p.id === prodId);
    //     if (!cartProduct) {
    //         return res.redirect('/cart');
    //     }
    //     CardModule.deleteCartItem(prodId, cartProduct.price);
    //     res.redirect('/cart');
    // });

}