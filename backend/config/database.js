
const { Sequelize } = require('sequelize');
require('dotenv').config();

// CONFIGURACIÒN DE LA BASE DE DATOS
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false // desaparece los logs SQL
    }
);

module.exports = sequelize;