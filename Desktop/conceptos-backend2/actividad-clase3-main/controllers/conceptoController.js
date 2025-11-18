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
    // ...la lógica del DELETE por ID...
};

// DELETE /api/conceptos
const deleteAllConceptos = async (req, res) => {
    // ...la lógica del DELETE de todos...
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