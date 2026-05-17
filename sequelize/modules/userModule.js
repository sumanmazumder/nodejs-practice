const Sequelize = require('sequelize');

const sequelize = require('../utils/database');


const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
}, {
    tableName: 'users',
    timestamps: false,
});

module.exports = User;