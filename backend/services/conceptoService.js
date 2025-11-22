const Concepto = require('../models/Concepto');

// Servicios de la App
module.exports = {
    obtenerTodos: () => Concepto.findAll(),

    obtenerPorId: (id) => Concepto.findByPk(id),

    crear: (data) => Concepto.create(data),

    actualizar: async (id, data) => {
        const concepto = await Concepto.findByPk(id);

        return concepto.update(data);
    },

    eliminar: async (id) => {
        const concepto = await Concepto.findByPk(id);

        return concepto.destroy();
    }

};