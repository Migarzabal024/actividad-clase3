const servicio = require('../services/conceptoService');

module.exports = {
    async listar(req , res){
        const datos = await servicio.obtenerTodos();
        res.json(datos);
    },

    async obtener(req , res) {
        const dato = await servicio.obtenerPorId(req.params.id);
        res.json(dato);
    },

    async crear(req , res) {
        const nuevo = await servicio.crear(req.body);
        res.json(nuevo);
    },

    async actualizar(req , res) {
        const actualizado = await servicio.actualizar(req.params.id, req.body);
        res.json(actualizado);
    },

    async eliminar(req , res) {
        await servicio.eliminar(req.params.id);
        res.json({
            mensaje: "Eliminado correctamente"
        });
    }
};