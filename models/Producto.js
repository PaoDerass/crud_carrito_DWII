const { DataTypes } = require('sequelize');
const sequelize = require('../Connection');

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    isv: {
        type: DataTypes.FLOAT
    },
    img: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Producto',
    timestamps: false
});

module.exports = Producto;
