// const product = []
const fs = require('fs');
const path = require('path');

module.exports = class Product {
    constructor(id, title, imgUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imgUrl = imgUrl;
        this.price = price;
        this.description = description;
    }

    saveProduct() {
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                try {
                    products = JSON.parse(fileContent);
                } catch (e) {
                    products = [];
                }
            }
            if (this.id) {
                const existingProductIndex = products.findIndex((prod) => prod.id === this.id);
                const updatedProducts = [...products];
                if (existingProductIndex !== -1) {
                    updatedProducts[existingProductIndex] = this;
                    fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                        if (err) console.log(err);
                    });
                }
            } else {
                this.id = Math.random().toString();
                console.log("Product", this);
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    if (err) console.log(err);
                });
            }
        });
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

    static deleteProduct(id) {
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]);
            } else {
                const products = JSON.parse(fileContent);
                // const findProduct = products.find((prod)=> prod.id !== id);
                const updateProduct = products.filter((prod) => prod.id !== id);

                fs.writeFile(p, JSON.stringify(updateProduct), err => {
                    if (!err) {
                        console.log("deleted product");
                    }
                })

            }
        })
    }
}