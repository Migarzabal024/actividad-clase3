const Concepto = require("../models/Concepto");

module.exports = {
    obtenerTodos() {
        return Concepto.findAll();
    },

    obtenerPorId(id) {
        return Concepto.findByPk(id);
    },

    crear(datos) {
        return Concepto.create(datos);
    },

    actualizar(id, datos) {
        return Concepto.update(datos, { where: { id } });
    },

    eliminar(id) {
        return Concepto.destroy({ where: { id } });
    },

    eliminarTodos() {
        return Concepto.destroy({ where: {}, truncate: true });
    }
};