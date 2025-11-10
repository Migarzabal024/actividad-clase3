// database/connection.js

const { Sequelize } = require('sequelize');

// --- CONFIGURA ESTO ---
const DB_NAME = 'tp2_db';      // El nombre que pusiste en phpMyAdmin
const DB_USER = 'root';        // Tu usuario de MySQL (casi siempre 'root')
const DB_PASS = '';            // Tu contraseña de MySQL (casi siempre vacía)
// -------------------------

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;