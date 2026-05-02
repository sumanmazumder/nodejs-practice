const ProductModules = require('../modules/product');

// GET add product
exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', { pagetitle: "Add Product", addProductActive: true, formCss: true, productCss: true, path: '/admin/add-product', editing: false });
}

//POST Add Product
exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const des = req.body.des;
    const allProduct = new ProductModules(title, imgUrl, price, des);
    allProduct.saveProduct();
    res.redirect('/')
}


// Product List
exports.getProduct = (req, res, next)=> {
    ProductModules.fetchAllPrduct(allProducts => {
        res.render('admin/product-list', {pagetitle: 'Admin product list', path : '/admin/product-list', products: allProducts})
    })
}

// edit product post
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/')
    }
    const id = req.params.productId;
    ProductModules.findById(id, product => {
        res.render('admin/edit-product', {pagetitle: 'Edit Product', path: '/admin/edit-product', editing: editMode, product: product})
    })
}
