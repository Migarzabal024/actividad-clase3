const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración de la base de datos
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, // Desactiva logs SQL en consola
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// Función para conectar y sincronizar
const conectarDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexión exitosa a la base de datos");
        
        // Sincronizar modelos (solo en desarrollo)
        if (process.env.NODE_ENV !== 'production') {
            await sequelize.sync({ alter: false }); // Cambia a 'true' si quieres auto-actualizar tablas
            console.log("✅ Modelos sincronizados con la base de datos");
        }
    } catch (error) {
        console.error("❌ Error al conectarse a la base de datos:", error.message);
        process.exit(1); // Detiene el servidor si no hay conexión
    }
};

module.exports = { sequelize, conectarDB };