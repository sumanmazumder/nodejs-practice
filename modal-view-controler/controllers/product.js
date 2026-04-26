const product = [];

exports.addGetProducts = (req, res, next) => {
    res.render('add-product', { pagetitle: "Add Product", addProductActive: true, formCss: true, productCss: true, path: '/admin/add-product' });
}

exports.addPostProduct = (req, res, next) => {
    console.log(req.body)
    // product.length = 0;
    product.push({ title: req.body.title });
    res.redirect('/')
}

exports.getProduct = (req, res, next) => {
    res.render('shop', { pagetitle: "Shop", shopActive: true, path: '/', formCss: true, productCss: true, hasProduct: product.length > 0, products: product });
}