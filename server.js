
// server.js ACTUALIZADO
const http = require('http');
const fs = require('fs');
const path = require('path');
const sequelize = require('./database/connection');
const Concepto = require('./models/concepto');

const server = http.createServer(async (req, res) => {
  // Configuración de CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const { url, method } = req;

  // --- SERVIR ARCHIVO HTML ---
  if (method === 'GET' && (url === '/' || url === '/index.html')) {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error al leer el archivo HTML.');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    });
    return;
  }

  // --- INICIO DE LA API REST CON BASE DE DATOS ---
  try {
    // GET /conceptos: Obtener todos los conceptos
    if (method === 'GET' && url === '/conceptos') {
      const conceptos = await Concepto.findAll();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(conceptos));
      return;
    }

    // POST /conceptos: Crear un nuevo concepto
    if (method === 'POST' && url === '/conceptos') {
      let body = '';
      req.on('data', chunk => body += chunk.toString());
      req.on('end', async () => {
        const { nombre, descripcion } = JSON.parse(body);
        const nuevoConcepto = await Concepto.create({ nombre, descripcion });
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(nuevoConcepto));
      });
      return;
    }

    // DELETE /conceptos/:id : Borrar un concepto específico
    if (method === 'DELETE' && url.startsWith('/conceptos/')) {
      const id = parseInt(url.split('/')[2]);
      const resultado = await Concepto.destroy({ where: { id } });
      if (resultado > 0) {
        res.writeHead(204); // No Content
        res.end();
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Concepto no encontrado' }));
      }
      return;
    }

    // DELETE /conceptos: Borrar todos los conceptos
    if (method === 'DELETE' && url === '/conceptos') {
        await Concepto.destroy({ where: {}, truncate: true });
        res.writeHead(204); // No Content
        res.end();
        return;
    }
    
    // Si ninguna ruta de la API coincide
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));

  } catch (error) {
    console.error("Error en el servidor:", error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Error interno del servidor' }));
  }
});

const PORT = 3000;

// Sincroniza el modelo con la base de datos y luego inicia el servidor
sequelize.sync().then(() => {
  console.log('🔄 Modelo sincronizado con la base de datos.');
  server.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('❌ Error al sincronizar el modelo:', error);

});