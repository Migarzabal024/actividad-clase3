// models/concepto.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

class Concepto extends Model {}

Concepto.init({
  // 'id' es creado automáticamente por Sequelize
  
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT, // Usamos TEXT para descripciones más largas
    allowNull: true
  }
  // 'createdAt' y 'updatedAt' son creados automáticamente
  // Tu vista HTML usa 'fechaCreacion', pero Sequelize usa 'createdAt'.
  // Vamos a cambiarlo en la vista HTML para que coincida.
}, {
  sequelize,
  modelName: 'Concepto'
  // El nombre de la tabla en MySQL será 'Conceptos' (plural)
});

module.exports = Concepto;