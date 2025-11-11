// 1. Importar los módulos necesarios de Node.js
const http = require('http'); // Módulo para crear el servidor HTTP
const fs = require('fs');     // Módulo para interactuar con el sistema de archivos (File System)

// 2. Variable para almacenar los conceptos en memoria (nuestra "base de datos")
// Cada concepto tendrá un id, nombre y descripción.
let conceptos = [];
let nextId = 1; // Para generar IDs únicos

// 3. Creamos el servidor
const server = http.createServer((req, res) => {
    const { method, url } = req; // Obtenemos el método (GET, POST, DELETE) y la URL de la petición

    // Log para ver en la consola del servidor cada petición que llega
    console.log(`Petición recibida: ${method} ${url}`);

    // --- MANEJO DE ARCHIVOS ESTÁTICOS (HTML, CSS, JS del cliente) ---
    if (method === 'GET') {
        if (url === '/') {
            // Servir el archivo index.html
            fs.readFile('index.html', 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error interno del servidor');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
            return; // Importante para no seguir ejecutando el código de la API
        }

        if (url === '/styles.css') {
            // Servir el archivo CSS
            fs.readFile('styles.css', 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error interno del servidor');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(data);
                }
            });
            return;
        }

        if (url === '/client.js') {
            // Servir el archivo JS del cliente
            fs.readFile('client.js', 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error interno del servidor');
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.end(data);
                }
            });
            return;
        }
    }

    // --- MANEJO DE LA API REST ---

    // Configuración de cabeceras para CORS (permitir que el navegador hable con este servidor)
    // y para indicar que la respuesta será en formato JSON.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Content-Type', 'application/json');

    // GET /conceptos: Obtener todos los conceptos
    if (method === 'GET' && url === '/conceptos') {
        res.writeHead(200);
        res.end(JSON.stringify(conceptos));
    }
    // GET /conceptos/:id: Obtener un concepto por su ID
    else if (method === 'GET' && url.startsWith('/conceptos/')) {
        const id = parseInt(url.split('/')[2]); // Extraemos el ID de la URL
        const concepto = conceptos.find(c => c.id === id);
        if (concepto) {
            res.writeHead(200);
            res.end(JSON.stringify(concepto));
        } else {
            res.writeHead(404); // Not Found
            res.end(JSON.stringify({ message: 'Concepto no encontrado' }));
        }
    }
    // POST /conceptos: Crear un nuevo concepto (lo necesitamos para el formulario)
    else if (method === 'POST' && url === '/conceptos') {
        let body = '';
        // Node.js recibe los datos en "chunks" (trozos), debemos unirlos
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { nombre, descripcion } = JSON.parse(body);
            const nuevoConcepto = { id: nextId++, nombre, descripcion };
            conceptos.push(nuevoConcepto);
            res.writeHead(201); // 201 Created
            res.end(JSON.stringify(nuevoConcepto));
        });
    }
    // DELETE /conceptos: Eliminar todos los conceptos
    else if (method === 'DELETE' && url === '/conceptos') {
        conceptos = [];
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'Todos los conceptos han sido eliminados' }));
    }
    // DELETE /conceptos/:id: Eliminar un concepto por su ID
    else if (method === 'DELETE' && url.startsWith('/conceptos/')) {
        const id = parseInt(url.split('/')[2]);
        const index = conceptos.findIndex(c => c.id === id);
        if (index !== -1) {
            conceptos.splice(index, 1);
            res.writeHead(200);
            res.end(JSON.stringify({ message: `Concepto con id ${id} eliminado` }));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'Concepto no encontrado' }));
        }
    }
    // Ruta no encontrada
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }
});

// 4. Iniciar el servidor y ponerlo a escuchar en un puerto
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});