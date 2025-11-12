// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const cron = require('node-cron');
const fs = require('fs');

// Importar conexión y modelo
const sequelize = require('./database/connection');
const Concepto = require('./models/concepto'); // ← ESTO FALTABA

// Importar rutas
const conceptoApiRoutes = require('./routes/conceptosRoutes');
const { getConceptosEJS } = require('./controllers/conceptoController');

// Crear aplicación Express
const app = express();
const PORT = 3000;

// ========== MIDDLEWARES ==========
app.use(cors()); // Habilitar CORS para React
app.use(express.json()); // Parsear JSON
app.use(express.urlencoded({ extended: true })); // Parsear formularios
app.use(express.static(path.join(__dirname, 'public'))); // Archivos estáticos

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ========== RUTAS API REST ==========
app.use('/api/conceptos', conceptoApiRoutes);

// ========== RUTAS VISTAS EJS ==========
app.get('/conceptos-vista', getConceptosEJS);
app.get('/lista', getConceptosEJS); // Alias para la vista EJS

// ========== RUTA REACT ==========
// Si tienes el build de React en public/react
app.get('/react', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'react', 'index.html'));
});

// ========== RUTA RAÍZ ==========
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ========== FUNCIÓN PARA SEMBRAR DATOS ==========
async function seedDatabase() {
    try {
        const count = await Concepto.count();
        
        if (count > 0) {
            console.log(`✅ La base de datos ya tiene ${count} conceptos.`);
            return;
        }

        console.log('🌱 Sembrando 5 conceptos iniciales...');
        
        await Concepto.bulkCreate([
            { 
                nombre: 'ExpressJS', 
                descripcion: 'Framework para Node.js que facilita la creación de APIs REST y aplicaciones web.' 
            },
            { 
                nombre: 'ORM (Sequelize)', 
                descripcion: 'Object-Relational Mapping. Permite usar clases JavaScript para manipular tablas SQL sin escribir queries directamente.' 
            },
            { 
                nombre: 'EJS', 
                descripcion: 'Embedded JavaScript. Motor de plantillas que permite generar HTML dinámico en el servidor.' 
            },
            { 
                nombre: 'ReactJS', 
                descripcion: 'Biblioteca de JavaScript del lado del cliente para crear interfaces de usuario interactivas (SPAs - Single Page Applications).' 
            },
            { 
                nombre: 'SOA', 
                descripcion: 'Service-Oriented Architecture (Arquitectura Orientada a Servicios). Separa la lógica de negocio en servicios independientes y reutilizables.' 
            }
        ]);
        
        console.log('✅ Conceptos iniciales creados correctamente.');
        
    } catch (error) {
        console.error('❌ Error al sembrar datos:', error);
    }
}

// ========== PROCESO BATCH ==========
// Exportar conceptos todos los martes a las 20:45
cron.schedule('45 20 * * 2', async () => {
    console.log('\n⏰ Ejecutando proceso batch de exportación...');
    console.log(`📅 Fecha: ${new Date().toLocaleString('es-AR')}`);
    
    try {
        const conceptos = await Concepto.findAll();
        
        const data = {
            fecha_exportacion: new Date().toISOString(),
            total_conceptos: conceptos.length,
            conceptos: conceptos.map(c => ({
                id: c.id,
                nombre: c.nombre,
                descripcion: c.descripcion,
                created_at: c.createdAt,
                updated_at: c.updatedAt
            }))
        };

        const jsonData = JSON.stringify(data, null, 2);
        
        // Crear carpeta exports si no existe
        const exportsDir = path.join(__dirname, 'exports');
        if (!fs.existsSync(exportsDir)) {
            fs.mkdirSync(exportsDir);
        }
        
        // Nombre del archivo con timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `conceptos_${timestamp}.json`;
        const filepath = path.join(exportsDir, filename);
        
        fs.writeFileSync(filepath, jsonData, 'utf8');
        
        console.log(`✅ Exportación completada: ${filename}`);
        console.log(`📊 Total de conceptos exportados: ${conceptos.length}\n`);
        
    } catch (error) {
        console.error('❌ Error en el proceso batch:', error);
    }
}, {
    timezone: "America/Argentina/Buenos_Aires"
});

// ========== MANEJO DE ERRORES 404 ==========
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Ruta no encontrada',
        ruta: req.url
    });
});

// ========== MANEJO DE ERRORES GENERAL ==========
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);
    res.status(500).json({ 
        error: 'Error interno del servidor',
        mensaje: err.message 
    });
});

// ========== INICIAR SERVIDOR ==========
async function iniciarServidor() {
    try {
        // Probar conexión a la base de datos
        await sequelize.authenticate();
        console.log('✅ Conexión a MySQL establecida correctamente');
        
        // Sincronizar modelos
        await sequelize.sync();
        console.log('✅ Modelos sincronizados con la base de datos');
        
        // Sembrar datos iniciales
        await seedDatabase();
        
        // Iniciar servidor Express
        app.listen(PORT, () => {
            console.log('\n' + '='.repeat(60));
            console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
            console.log('='.repeat(60));
            console.log('\n📌 Rutas disponibles:');
            console.log(`   • http://localhost:${PORT}/ - Página principal`);
            console.log(`   • http://localhost:${PORT}/lista - Vista EJS`);
            console.log(`   • http://localhost:${PORT}/react - Vista React`);
            console.log(`   • http://localhost:${PORT}/api/conceptos - API REST`);
            console.log('\n⏰ Proceso batch configurado: Martes 20:45 hs');
            console.log('='.repeat(60) + '\n');
        });
        
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
}

// ========== EJECUTAR ==========
iniciarServidor();

// ========== MANEJO DE CIERRE GRACEFUL ==========
process.on('SIGINT', async () => {
    console.log('\n\n🛑 Cerrando servidor...');
    await sequelize.close();
    console.log('✅ Conexión a MySQL cerrada');
    process.exit(0);
});