// models/concepto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Concepto = sequelize.define('Concepto', {
  // El ID se crea automáticamente por Sequelize
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Nombre del concepto
  nombre: {
    type: DataTypes.STRING,
    allowNull: false // Este campo es obligatorio
  },
  // Descripción del concepto
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false // Este campo también es obligatorio
  }
}, {
  // Opciones adicionales del modelo
  tableName: 'conceptos', // Nombre explícito de la tabla
  timestamps: false // No queremos las columnas createdAt y updatedAt
});

module.exports = Concepto;