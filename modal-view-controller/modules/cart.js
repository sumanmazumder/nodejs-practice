const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json')

module.exports = class Card {
    static addCart(id, product) {
        let cart = { products: [], totalPrice: 0 };
        fs.readFile(p, (err, fileContent) => {
            if (!err && fileContent.length > 0) {
                cart = JSON.parse(fileContent);
            }
            if (!cart.products) {
                cart.products = [];
            }
            if (cart.totalPrice === undefined) {
                cart.totalPrice = 0;
            }

            // 1. Find if the product already exists in the cart
            const existingProductIndex = cart.products.findIndex((prod) => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];

            if (existingProduct) {
                // 2. If it exists, update the count
                const updatedProduct = { ...existingProduct };
                updatedProduct.count = updatedProduct.count + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                // 3. If it's new, add it with count: 1
                const newProduct = { ...product, count: 1 };
                cart.products.push(newProduct);
            }

            // 4. Always update the total price
            cart.totalPrice = +cart.totalPrice + +product.price;

            // 5. Always save the file
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) console.log("Error saving cart:", err);
            });
        });
    }

    static deleteCartItem(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const cart = JSON.parse(fileContent);
            const updatedCart = { ...cart };
            const product = updatedCart.products.find(prod => prod.id === id);
            if (!product) {
                return;
            }
            const productQty = product.count;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - (productPrice * productQty);

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                if (err) console.log("Error deleting from cart:", err);
            });
        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return cb(null);
            }
            try {
                const cart = JSON.parse(fileContent);
                cb(cart);
            } catch (err) {
                cb(null);
            }
        });
    }
}