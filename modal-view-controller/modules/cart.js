const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json')

module.exports = class Card {
    static getCart (id, product) {
        console.log("Cart Product", product);
    }
}