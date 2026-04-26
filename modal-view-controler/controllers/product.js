const ProductModules = require('../modules/product');

exports.addGetProducts = (req, res, next) => {
    res.render('add-product', { pagetitle: "Add Product", addProductActive: true, formCss: true, productCss: true, path: '/admin/add-product' });
}

exports.addPostProduct = (req, res, next) => {
    console.log(req.body)
    const allProduct = new ProductModules(req.body.title);
    allProduct.saveProduct();
    res.redirect('/')
}

exports.getProduct = (req, res, next) => {
    // const allProduct = new productModules();
    ProductModules.fetchAllPrduct(allProducts => {
        res.render('shop', { pagetitle: "Shop", shopActive: true, path: '/', formCss: true, productCss: true, hasProduct: allProducts.length > 0, products: allProducts });

    });
}