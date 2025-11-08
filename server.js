// server.js (Versión con EXPRESS)

const express = require('express');
const cors =require('cors');
const path = require('path');
const sequelize = require('./database/connection');
const Concepto = require('./models/concepto');

// 1. Configuración de Express
const app = express();
const PORT = 3000;

app.use(cors()); // Permite CORS para que tu HTML pueda llamar a la API
app.use(express.json()); // Permite a Express entender el JSON que envía tu formulario
app.use(express.static(path.join(__dirname, 'public'))); // SIRVE TODOS TUS ARCHIVOS ESTÁTICOS

// -----------------------------------------------------
// 2. Definición de API REST
// (Estas rutas SÍ coinciden con las de tu HTML)
// -----------------------------------------------------

// GET /api/conceptos: Obtener todos
app.get('/api/conceptos', async (req, res) => {
  try {
    const conceptos = await Concepto.findAll();
    res.json(conceptos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener conceptos' });
  }
});

// POST /api/conceptos: Crear uno nuevo
app.post('/api/conceptos', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const nuevoConcepto = await Concepto.create({ nombre, descripcion });
    res.status(201).json(nuevoConcepto);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear concepto' });
  }
});

// DELETE /api/conceptos/:id : Borrar uno específico
app.delete('/api/conceptos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Concepto.destroy({ where: { id } });
    
    if (resultado > 0) {
      res.status(204).end(); // 204 = "No Content" (éxito, pero no devuelve nada)
    } else {
      res.status(404).json({ error: 'Concepto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar concepto' });
  }
});

// DELETE /api/conceptos: Borrar TODOS
app.delete('/api/conceptos', async (req, res) => {
  try {
    await Concepto.destroy({ where: {}, truncate: true });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar todos los conceptos' });
  }
});

// -----------------------------------------------------
// 3. Iniciar el Servidor
// -----------------------------------------------------
sequelize.sync().then(() => {
  console.log('🔄 Modelo sincronizado con la base de datos.');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    console.log('📂 Sirviendo archivos estáticos desde la carpeta "public"');
  });
}).catch(error => {
  console.error('❌ Error al sincronizar el modelo:', error);
});