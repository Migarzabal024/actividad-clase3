// database/connection.js
const { Sequelize } = require('sequelize');

// Reemplaza 'nombre_de_tu_db', 'tu_usuario', y 'tu_contraseña' con tus credenciales.
const sequelize = new Sequelize('conceptos_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Función para probar la conexión
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión con la base de datos establecida correctamente.');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
  }
}

testConnection();

module.exports = sequelize;