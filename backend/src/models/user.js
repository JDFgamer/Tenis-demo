const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const sequelize = require('../DB/database');
const Court = require('./court');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userGoogle: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

User.belongsToMany(Court, {through: "user_court"})
Court.hasOne(User, {through: "user_court"})

module.exports = User;