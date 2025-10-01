const http = require('http');
const fs = require('fs');
const path = require('path');
const Concepto = require('./models/concepto');

const PORT = 3000;

// Función para parsear el body JSON
const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('JSON inválido'));
      }
    });
  });
};

const validConceptoData = (data) => {
  // Se valida que exista nombre y no esté vacío
  return data && typeof data.nombre === 'string' && data.nombre.trim() !== '';
};

const server = http.createServer(async (req, res) => {
  // Configuración CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    // Manejo ruta GET
    if (req.method === 'GET') {
      if (req.url === '/' || req.url === '/index.html') {
        // ... (leer y devolver index.html)
      } else if (req.url === '/conceptos') {
        // Obtener todos los conceptos desde la base de datos
        const conceptos = await Concepto.findAll();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(conceptos));
      } else if (req.url.match(/^\/conceptos\/\d+$/)) {
        // Obtener un concepto por id
        const id = req.url.split('/')[2];
        const concepto = await Concepto.findByPk(id);
        if (concepto) {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(concepto));
        } else {
          // No encontrado: 404 con JSON error
          res.writeHead(404, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({ error: 'Concepto no encontrado' }));
        }
      } else {
        res.writeHead(404);
        res.end();
      }
    }
    // Manejo ruta POST (creación)
    else if (req.method === 'POST' && req.url === '/conceptos') {
      const datos = await parseBody(req);
      if (!validConceptoData(datos)) {
        // Error de validación: nombre obligatorio
        res.writeHead(400, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify({ error: 'Nombre es obligatorio' }));
      }
      const nuevo = await Concepto.create(datos);
      res.writeHead(201, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(nuevo));
    }
    // Manejo ruta PUT/PATCH (actualización)
    else if ((req.method === 'PUT' || req.method === 'PATCH') && req.url.match(/^\/conceptos\/\d+$/)) {
      const datos = await parseBody(req);
      if (!validConceptoData(datos)) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify({ error: 'Nombre es obligatorio para actualizar' }));
      }
      const id = req.url.split('/')[2];
      const [actualizado] = await Concepto.update(datos, { where: { id } });
      if (actualizado) {
        const conceptoActualizado = await Concepto.findByPk(id);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(conceptoActualizado));
      } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ error: 'Concepto no encontrado' }));
      }
    }
    // Manejo ruta DELETE (borrado)
    else if (req.method === 'DELETE' && req.url.match(/^\/conceptos\/\d+$/)) {
      const id = req.url.split('/')[2];
      const eliminado = await Concepto.destroy({ where: { id } });
      if (eliminado) {
        res.writeHead(204);
        res.end();
      } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ error: 'Concepto no encontrado' }));
      }
    }
    // Otros métodos no permitidos
    else {
      res.writeHead(405, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ error: 'Método no permitido' }));
    }
  } catch (error) {
    // Error inesperado servidor
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ error: 'Error interno del servidor' }));
  }
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:3000/`);
});
