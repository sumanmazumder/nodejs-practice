const Sequelize = require('Sequelize');
const sequelize = require('../utils/database');


const CartItem = sequelize.define('CartItem', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    quentity: Sequelize.INTEGER
})

module.exports = CartItem;