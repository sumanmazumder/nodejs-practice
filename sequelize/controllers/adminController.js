const Product = require('../modules/product');

exports.getAddproduct = (req, res, next) => {
    res.render('admin/add-product',
        {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            addProductActive: true,
            formCss: true,
            productCss: true,
            editing: false,
        })
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;
    const productId = req.body.productId;
    Product.create({
        title: title,
        imgUrl: imgUrl,
        price: price,
        description: description,
    }).then(result => { console.log("Product create==>", result) }).catch(err => { console.log(err) });
}

exports.getProducts = (req, res, next) => {
    Product.findAll().then(result => {
        res.render('admin/product-list', {
            pageTitle: 'Product List',
            path: '/admin/product-list',
            addProductActive: true,
            product: result
        })
    }).catch(err => {
        console.log(err);
    })

}

exports.getEditAdminProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/')
    }
    const prodId = req.params.prodId;
    Product.findByPk(prodId).then(product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/add-product', {
            pageTitle: 'Edit Product',
            path: '/admin/add-product',
            editing: editMode,
            product: product,
        })

    }).catch(err => {
        console.log(err);
    })
}

exports.postEditAdminProduct = (req, res, next) => {
    const prodId = req.params.prodId;
    const updateId = req.body.productId;
    const updateTitle = req.body.title;
    const updatePrice = req.body.price;
    const updateimgUrl = req.body.imgUrl;
    const updatedescription = req.body.description;
    
    Product.findByPk(updateId).then(result=> {
        result.title = updateTitle;
        result.price = updatePrice;
        result.imgUrl = updateimgUrl;
        result.description = updatedescription;
        return result.save();
    }).then(result => {
        console.log("PRODUCT UPDATED")
        res.redirect('/admin/product-list')
    }).catch(err=> {
        console.log(err)
    })
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.prodId;

    Product.findByPk(prodId).then(product => {
        product.destroy()
    }).then(result => {
        console.log("PRODUCt DELETED");
        res.redirect('/admin/product-list')
    }).catch(err => {
        console.log(err);
    })

    res.redirect('/admin/product-list')
}