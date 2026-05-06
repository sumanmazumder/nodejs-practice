const ProductModules = require('../modules/product');
const CardModule = require('../modules/cart');

exports.getProducts = (req, res, next) => {
    // const allProduct = new productModules();
    ProductModules.fetchAllPrduct(allProducts => {
        res.render('shop/product-list', { pagetitle: "Product List", shopActive: true, path: '/products', formCss: true, productCss: true, hasProduct: allProducts.length > 0, products: allProducts });

    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    ProductModules.findById(prodId, product => {
        res.render('shop/product-details', {pagetitle: "Product details", path: '/products', product: product});
    })

}

exports.getIndex = (req, res, next)=> {
    ProductModules.fetchAllPrduct(allProducts => {
        res.render('shop/index', {pagetitle: 'Shop', path : '/', products: allProducts})
    })
}

exports.postCard = (req, res, next) => {
    const proId = req.body.proId;
    ProductModules.findById(proId, product => {
        CardModule.addCart(proId, product);
    });
    res.render()
    // res.redirect('/cart');
}

exports.getCart = (req, res, next)=> {
    res.render('shop/cart', {pagetitle: 'Cart Page', path : '/cart'})
}

exports.getOrders = (req, res, next)=> {
    res.render('shop/orders', {pagetitle: 'Order Page', path : '/orders'})
}

exports.getCheckout = (req, res, next)=> {
    res.render('shop/checkout', {pagetitle: 'Checkout Page', path : '/checkout'})
}

exports.postCartDeleteProduct = (req, res, next)=> {
    
}