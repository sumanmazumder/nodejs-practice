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
    const description = req.body.description;
    const allProduct = new ProductModules(null, title, imgUrl, price, description);
    allProduct.saveProduct();
    res.redirect('/')
}


// Product List
exports.getProduct = (req, res, next) => {
    ProductModules.fetchAllPrduct(allProducts => {
        res.render('admin/product-list', { pagetitle: 'Admin product list', path: '/admin/product-list', products: allProducts })
    })
}

// edit product post
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/')
    }
    const id = req.params.productId;
    ProductModules.findById(id, product => {
        res.render('admin/edit-product', { pagetitle: 'Edit Product', path: '/admin/edit-product', editing: editMode, product: product })
    })
}

exports.postEditProduct = (req, res, next) => {
    const updateProId = req.body.productId;
    const updateProTitle = req.body.title;
    const updateProPrice = req.body.price;
    const updateProimgUrl = req.body.imgUrl;
    const updateProDescription = req.body.description;

    const updateProduct = new ProductModules(updateProId, updateProTitle, updateProimgUrl, updateProPrice, updateProDescription);
    updateProduct.saveProduct();
    res.redirect('/admin/product-list');
};
