// const product = []
const fs = require('fs');
const path = require('path');

module.exports = class Product {
    constructor(t){
        this.title = t;
    }

    saveProduct() {
        const p = path.join(path.dirname(process.mainModule.filename), 'data' , 'product.json');
        fs.readFile(p, (err, fileContent) => {
            console.log("fileContent", fileContent);
            let product = [];
            if(!err) {
                product = JSON.parse(fileContent)
            }
            // product.push(this);
            fs.writeFile(p, JSON.stringify(product), err => {
                console.log(err);
            })
        })
    }

    static fetchAllPrduct(cb) {
        // return product;
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'product.json');
        fs.readFile(p, (err, fileContent)=> {
            if(err) {
                cb([])
            }
            cb(JSON.parse(fileContent))
        })
    }
}