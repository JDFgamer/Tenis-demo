const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATA_BASE);

module.exports = sequelize;