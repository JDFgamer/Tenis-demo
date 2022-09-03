const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const sequelize = require('../DB/database');

const Court = sequelize.define('Court', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    availableDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    turn:{
        type: DataTypes.STRING,
        allowNull: false
    },
    reserved:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

module.exports = Court;