// server.js (MUY LIMPIO)
const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./database/connection');

// Importar las rutas
const conceptoApiRoutes = require('./routes/conceptosRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Sirve tus HTML/CSS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- CONEXIÓN DE RUTAS ---
// Le decimos a Express que use estas rutas bajo el prefijo /api/conceptos
app.use('/api/conceptos', conceptoApiRoutes);

// ... (Aquí añadiremos las nuevas rutas de EJS y el Batch) ...

// Iniciar el Servidor
sequelize.sync().then(() => {
  console.log('🔄 Modelo sincronizado con la base de datos.');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('❌ Error al sincronizar el modelo:', error);
});

// Función para poner conceptos dentro de la base de datos
async function seedDatabase() {
  const count = await Concepto.count();
  if (count > 0) {
    console.log('La base de datos ya tiene conceptos.');
    return;
  }

  console.log('Sembrando 5 conceptos iniciales...');
  await Concepto.bulkCreate([
    { nombre: 'ExpressJS', descripcion: 'Framework para Node.js que facilita la creación de APIs REST.' },
    { nombre: 'ORM (Sequelize)', descripcion: 'Mapeo de Objeto-Relacional. Permite usar Clases para manipular tablas SQL.' },
    { nombre: 'EJS', descripcion: 'Motor de plantillas que permite generar HTML dinámico en el servidor.' },
    { nombre: 'ReactJS', descripcion: 'Biblioteca de UI del lado del cliente para crear SPAs (Single Page Applications).' },
    { nombre: 'SOA', descripcion: 'Arquitectura Orientada a Servicios. Separa la lógica en servicios independientes.' }
  ]);
}

// ... (En server.js)
const { getConceptosEJS } = require('./controllers/conceptoController');

// ... (cerca de app.use('/api/conceptos', ...))

// --- RUTA PARA VISTAS EJS ---
app.get('/conceptos-vista', getConceptosEJS);

// ... (En server.js)
const cron = require('node-cron');
const fs = require('fs'); // Módulo de Node para escribir archivos

// ... (cerca del final, antes de sequelize.sync)

// --- REQUISITO 7: Proceso Batch ---
// '45 20 * * 2' = "A las 20:35 (8:35 PM) todos los Martes"
cron.schedule('45 20 * * 2', async () => {
  console.log('⏰ Ejecutando proceso batch de exportación...');
  try {
    const conceptos = await Concepto.findAll();
    const data = JSON.stringify(conceptos, null, 2); // Formato JSON bonito

    // Escribe el archivo en la raíz del proyecto
    fs.writeFileSync('export_conceptos.json', data, 'utf8');
    console.log('✅ Exportación de conceptos completada.');
  } catch (error) {
    console.error('❌ Error en el proceso batch:', error);
  }
}, {
  timezone: "America/Argentina/Buenos_Aires" // Opcional pero recomendado
});