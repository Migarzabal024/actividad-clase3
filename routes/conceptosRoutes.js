// routes/conceptosRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getAllConceptos, 
  createConcepto, 
  deleteConcepto, 
  deleteAllConceptos 
} = require('../controllers/conceptoController');

// Rutas de la API
router.get('/', getAllConceptos);
router.post('/', createConcepto);
router.delete('/:id', deleteConcepto);
router.delete('/', deleteAllConceptos);

module.exports = router;