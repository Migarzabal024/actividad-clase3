const http = require('http');
const fs = require('fs');

// Nuestra "base de datos" en memoria
let conceptos = [
    {
        id: 1,
        nombre: 'Node.js',
        descripcion: 'Entorno de ejecución para JavaScript del lado del servidor.'
    },
    {
        id: 2,
        nombre: 'DOM',
        descripcion: 'Document Object Model, una representación del documento HTML.'
    }
];
let nextId = 3; // Para generar IDs únicos para nuevos conceptos

// Puerto en el que escuchará el servidor
const PORT = 3000;

// Creación del servidor
const server = http.createServer((request, response) => {
    console.log(`Petición recibida: ${request.method} ${request.url}`);

    // --- RUTA 1: Servir el HTML principal ---
    if (request.url === '/') {
        fs.readFile('index.html', 'utf8', (error, data) => {
            if (error) {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Error interno del servidor');
                return;
            }
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(data);
        });
    
    // --- RUTA 2: Servir el CSS ---
    } else if (request.url === '/styles.css') {
        fs.readFile('styles.css', 'utf8', (error, data) => {
            if (error) {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Error interno del servidor');
                return;
            }
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.end(data);
        });
    
    // --- RUTA 3 (API): Obtener todos los conceptos (GET) ---
    } else if (request.url === '/conceptos' && request.method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        const jsonResponse = JSON.stringify(conceptos);
        response.end(jsonResponse);
    
    // --- RUTA 4 (API): Crear un nuevo concepto (POST) ---
    } else if (request.url === '/conceptos' && request.method === 'POST') {
        let body = '';
        request.on('data', chunk => { body += chunk.toString(); });
        request.on('end', () => {
            try {
                const newConcept = JSON.parse(body);
                newConcept.id = nextId++;
                conceptos.push(newConcept);
                response.writeHead(201, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(newConcept));
            } catch (error) {
                response.writeHead(400, { 'Content-Type': 'text/plain' });
                response.end('Error: JSON mal formado');
            }
        });

    // --- RUTA 5 (API): Eliminar TODOS los conceptos (DELETE) ---
    } else if (request.url === '/conceptos' && request.method === 'DELETE') {
        conceptos = [];
        nextId = 1;
        response.writeHead(204);
        response.end();

    // --- RUTA 6 (API): Eliminar un concepto específico (DELETE) ---
    } else if (request.url.startsWith('/conceptos/') && request.method === 'DELETE') {
        const idToDelete = parseInt(request.url.split('/')[2]);
        const conceptIndex = conceptos.findIndex(c => c.id === idToDelete);

        if (conceptIndex !== -1) {
            conceptos.splice(conceptIndex, 1);
            response.writeHead(204);
            response.end();
        } else {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('Concepto no encontrado');
        }
    
    // --- RUTA POR DEFECTO: 404 No Encontrado ---
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('404 Not Found');
    }
});

// El servidor se pone a escuchar
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});