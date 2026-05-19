const Sequelize = require('Sequelize');

const sequelize = require('../utils/database');

const order = sequelize.define({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    }
})