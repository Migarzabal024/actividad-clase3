const express = require("express");
const router = express.Router();
const controller = require("../controllers/conceptoController");

// ========== VISTAS EJS ==========
router.get("/", controller.vistaListado); // Página principal
router.get("/conceptos", controller.vistaListado);
router.get("/conceptos/crear", controller.vistaCrear);
router.post("/conceptos/crear", controller.postCrear);
router.get("/conceptos/editar/:id", controller.vistaEditar);
router.post("/conceptos/editar/:id", controller.postEditar);

// ========== API REST ==========
router.get("/api/conceptos", controller.apiListar);
router.get("/api/conceptos/:id", controller.apiObtenerPorId); // Agregada
router.post("/api/conceptos", controller.apiCrear);
router.put("/api/conceptos/:id", controller.apiActualizar);
router.delete("/api/conceptos/:id", controller.apiEliminar);
router.delete("/api/conceptos", controller.apiEliminarTodos); // Agregada

module.exports = router;