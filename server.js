// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

// Puerto del servidor
const PORT = 3000;

// Almacenamiento en memoria (array de conceptos)
let conceptos = [];
let idCounter = 1;

// Función para leer archivos estáticos
function servirArchivoEstatico(res, rutaArchivo, tipoContenido) {
    fs.readFile(rutaArchivo, (err, contenido) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error interno del servidor');
        } else {
            res.writeHead(200, { 'Content-Type': tipoContenido });
            res.end(contenido);
        }
    });
}

// Crear el servidor
const server = http.createServer((req, res) => {
    const url = req.url;
    const metodo = req.method;

    // Habilitar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Manejar preflight requests
    if (metodo === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // RUTAS PARA ARCHIVOS ESTÁTICOS
    if (url === '/' || url === '/index.html') {
        servirArchivoEstatico(res, path.join(__dirname, 'public', 'index.html'), 'text/html');
    } 
    else if (url === '/view.html') {
        servirArchivoEstatico(res, path.join(__dirname, 'public', 'view.html'), 'text/html');
    } 
    else if (url === '/styles.css') {
        servirArchivoEstatico(res, path.join(__dirname, 'public', 'styles.css'), 'text/css');
    }

    // API REST - GET: Obtener todos los conceptos
    else if (url === '/api/conceptos' && metodo === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(conceptos));
    }

    // API REST - GET/id: Obtener un concepto específico
    else if (url.match(/^\/api\/conceptos\/\d+$/) && metodo === 'GET') {
        const id = parseInt(url.split('/')[3]);
        const concepto = conceptos.find(c => c.id === id);
        
        if (concepto) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(concepto));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Concepto no encontrado' }));
        }
    }

    // API REST - POST: Crear nuevo concepto
    else if (url === '/api/conceptos' && metodo === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const { nombre, descripcion } = JSON.parse(body);
                
                // Validar datos
                if (!nombre || !descripcion) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Nombre y descripción son obligatorios' }));
                    return;
                }

                // Crear nuevo concepto
                const nuevoConcepto = {
                    id: idCounter++,
                    nombre: nombre,
                    descripcion: descripcion,
                    fechaCreacion: new Date().toISOString()
                };

                conceptos.push(nuevoConcepto);

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(nuevoConcepto));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'JSON inválido' }));
            }
        });
    }

    // API REST - DELETE: Eliminar todos los conceptos
    else if (url === '/api/conceptos' && metodo === 'DELETE') {
        conceptos = [];
        idCounter = 1;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ mensaje: 'Todos los conceptos eliminados' }));
    }

    // API REST - DELETE/id: Eliminar un concepto específico
    else if (url.match(/^\/api\/conceptos\/\d+$/) && metodo === 'DELETE') {
        const id = parseInt(url.split('/')[3]);
        const indice = conceptos.findIndex(c => c.id === id);
        
        if (indice !== -1) {
            const conceptoEliminado = conceptos.splice(indice, 1)[0];
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                mensaje: 'Concepto eliminado',
                concepto: conceptoEliminado 
            }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Concepto no encontrado' }));
        }
    }

    // Ruta no encontrada
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada');
    }
});

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});