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

exports.getCard = (req, res, next)=> {
    const prodId = req.body.productId;
    console.log(prodId);
    res.render('shop/cart', {pagetitle: 'Cart Page', path : '/cart'})
}

exports.postCard = (req, res, next) => {
    const proId = req.body.productId;
    console.log("prodId===========================>", prodId);
    ProductModules.findById(proId, product=> {
        CardModule.getCart(proId, product);
    })
    res.render()
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