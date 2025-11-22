const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Concepto = sequelize.define('Concepto',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
},{
    tableName: 'conceptos',
    timestamps:false
});

module.exports = Concepto;