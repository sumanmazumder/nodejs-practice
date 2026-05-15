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
        res.render('shop/product-details', { pagetitle: "Product details", path: '/products', product: product });
    })

}

exports.getIndex = (req, res, next) => {
    ProductModules.fetchAllPrduct(allProducts => {
        res.render('shop/index', { pagetitle: 'Shop', path: '/', products: allProducts })
    })
}

exports.postCard = (req, res, next) => {
    const proId = req.body.proId;
    ProductModules.findById(proId, product => {
        CardModule.addCart(proId, product);
    });
    res.redirect('/cart');
}

exports.getCart = (req, res, next) => {
    CardModule.getCart(cart => {
        const products = cart ? cart.products : [];
        res.render('shop/cart', {
            pagetitle: 'Cart Page',
            path: '/cart',
            products: products
        });
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { pagetitle: 'Order Page', path: '/orders' })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { pagetitle: 'Checkout Page', path: '/checkout' })
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    // Find the product price from the cart as a fallback if product lookup fails
    CardModule.getCart(cart => {
        if (!cart || !cart.products) {
            return res.redirect('/cart');
        }
        const cartProduct = cart.products.find(p => p.id === prodId);
        if (!cartProduct) {
            return res.redirect('/cart');
        }
        CardModule.deleteCartItem(prodId, cartProduct.price);
        res.redirect('/cart');
    });
}