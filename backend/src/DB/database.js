const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATA_BASE.toString());

module.exports = sequelize;