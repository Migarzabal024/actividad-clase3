const fs = require("fs");
const path = require("path");
const servicio = require("../services/conceptoService");

module.exports = async () => {
    try {
        console.log("📦 Iniciando exportación de conceptos...");
        
        const datos = await servicio.obtenerTodos();
        
        if (!datos || datos.length === 0) {
            console.log("⚠️  No hay conceptos para exportar");
            return;
        }

        // Crear carpeta exports si no existe
        const exportDir = path.join(__dirname, "..", "exports");
        if (!fs.existsSync(exportDir)) {
            fs.mkdirSync(exportDir, { recursive: true });
        }

        // Generar nombre de archivo con fecha
        const fecha = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const nombreArchivo = `conceptos_${fecha}.json`;
        const rutaArchivo = path.join(exportDir, nombreArchivo);

        // Guardar archivo
        const json = JSON.stringify(datos, null, 2);
        fs.writeFileSync(rutaArchivo, json, "utf8");
        
        console.log(`✅ Exportación exitosa: ${nombreArchivo}`);
        console.log(`📊 Total de conceptos exportados: ${datos.length}`);
        
    } catch (error) {
        console.error("❌ Error durante la exportación:", error.message);
    }
};