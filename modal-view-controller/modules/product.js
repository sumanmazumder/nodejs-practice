// const product = []
const fs = require('fs');
const path = require('path');

module.exports = class Product {
    constructor(id, title, imgUrl, price, dec) {
        this.id = id;
        this.title = title;
        this.imgUrl = imgUrl;
        this.price = price;
        this.dece = dec;
    }

    saveProduct() {
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

        if (this.id) {
            fs.readFile(p, (err, fileContent) => {
                console.log("fileContent", fileContent);
                let product = [];
                if (!err) {
                    product = JSON.parse(fileContent)
                }
                const existingProduct = product.findIndex((prod) => prod?.id === this.id)
                console.log("Product list ======>", existingProduct);
                const updatedProducts = [...product];
                updatedProducts[existingProduct] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                })
            })

        } else {
            this.id = Math.random().toString();
            product.push(this);
            fs.writeFile(p, JSON.stringify(product), err => {
                console.log(err);
            })
        }
    }

    static fetchAllPrduct(cb) {
        // return product;
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([])
            }
            cb(JSON.parse(fileContent))
        })
    }

    static findById(id, cb) {
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([])
            }
            const products = JSON.parse(fileContent);
            const product = products.find(p => p.id === id);
            // console.log("product details", product);
            cb(product);
        })
    }
}