const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Carrito = sequelize.define('Carrito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Producto', 
            key: 'id'
        }
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0 
    }
}, {
    tableName: 'Carrito',
    timestamps: false
});

module.exports = Carrito;
