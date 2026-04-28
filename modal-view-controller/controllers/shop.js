const ProductModules = require('../modules/product');

exports.getProduct = (req, res, next) => {
    // const allProduct = new productModules();
    ProductModules.fetchAllPrduct(allProducts => {
        res.render('shop/product-list', { pagetitle: "Product List", shopActive: true, path: '/products', formCss: true, productCss: true, hasProduct: allProducts.length > 0, products: allProducts });

    });
}

exports.getIndex = (req, res, next)=> {
    ProductModules.fetchAllPrduct(allProducts => {
        res.render('shop/index', {pagetitle: 'Shop', path : '/', products: allProducts})
    })
}

exports.getCard = (req, res, next)=> {
    res.render('shop/cart', {pagetitle: 'Cart Page', path : '/cart'})
}

exports.getOrders = (req, res, next)=> {
    res.render('shop/orders', {pagetitle: 'Order Page', path : '/orders'})
}

exports.getCheckout = (req, res, next)=> {
    res.render('shop/checkout', {pagetitle: 'Checkout Page', path : '/checkout'})
}

exports.productDeatils = (req, res, next) => {
    res.render('shop/product-details', {pagetitle: 'Product deatisl Page', path : '/product-details'})
}