// controllers/conceptoController.js
const Concepto = require('../models/concepto');

// GET /api/conceptos
const getAllConceptos = async (req, res) => {
  try {
    const conceptos = await Concepto.findAll();
    res.json(conceptos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener conceptos' });
  }
};

// POST /api/conceptos
const createConcepto = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const nuevoConcepto = await Concepto.create({ nombre, descripcion });
    res.status(201).json(nuevoConcepto);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear concepto' });
  }
};

// DELETE /api/conceptos/:id
const deleteConcepto = async (req, res) => {
  try {
    const id = req.params.id;
    const filasEliminadas = await Concepto.destroy({ where: { id: id } });
    if (filasEliminadas === 0) {
      return res.status(404).json({ error: 'Concepto no encontrado' });
    }
    res.status(204).send(); // Eliminación exitosa, sin contenido en body
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar concepto' });
  }
};

// DELETE /api/conceptos
const deleteAllConceptos = async (req, res) => {
  try {
    // Se eliminan todos los registros de la tabla Conceptos
    await Concepto.destroy({ truncate: true }); // Borra todo y resetea IDs
    res.status(204).send(); // Sin contenido, eliminación exitosa
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar todos los conceptos' });
  }
};

// ... (al final de conceptoController.js)

// GET /conceptos-vista : Ruta para la vista EJS
const getConceptosEJS = async (req, res) => {
  try {
    const conceptos = await Concepto.findAll();
    // Renderiza el archivo 'views/conceptos.ejs' y le pasa los datos
    res.render('conceptos', { conceptos: conceptos }); 
  } catch (error) {
    res.status(500).send('Error al cargar la vista');
  }
};

module.exports = {
  getAllConceptos,
  createConcepto,
  deleteConcepto,
  deleteAllConceptos,
  getConceptosEJS 
};