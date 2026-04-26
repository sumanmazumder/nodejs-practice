// const product = []
const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'product.json');
const getProductFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(fileContent))
        }
    })
}
module.exports = class Product {
    constructor(t) {
        this.title = t;
    }
    saveProduct() {
        getProductFromFile(product => {
            product.push(this);
            fs.writeFile(p, JSON.stringify(product), err => {
                console.log(err);
            })
        })
    }
    static fetchAllPrduct(cb) {
        getProductFromFile(cb);
    }
}