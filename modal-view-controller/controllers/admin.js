const ProductModules = require('../modules/product');

// GET add product
exports.addGetProducts = (req, res, next) => {
    res.render('admin/add-product', { pagetitle: "Add Product", addProductActive: true, formCss: true, productCss: true, path: '/admin/add-product' });
}

//POST Add Product
exports.addPostProduct = (req, res, next) => {
    console.log(req.body);
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const des = req.body.des;
    const allProduct = new ProductModules(title, imgUrl, price, des);
    allProduct.saveProduct();
    res.redirect('/')
}


// Edit Product
exports.editProduct = (req, res, next) => {
    res.render('admin/edit-product', {pagetitle: 'Edit Product', path: '/admin/edit-product'})
}

// Product List
exports.adminProductList = (req, res, next)=> {
    ProductModules.fetchAllPrduct(allProducts => {
        res.render('admin/product-list', {pagetitle: 'Admin product list', path : '/admin/product-list', products: allProducts})
    })
}