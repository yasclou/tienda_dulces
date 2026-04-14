const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const { login } = require('../controllers/authController');

const {
  agregarDulceConLog,
  obtenerDulces,
  actualizarDulce,
  eliminarDulce
} = require('../services/servicesDulces');

// --- 1. RUTA DE AUTENTICACIÓN (NUEVA) ---
// Esta ruta sirve para obtener el "pase VIP" (Token)
router.post('/login', login);

// --- 2. RUTAS PÚBLICAS ---

// GET /dulces → lista todos los dulces (Cualquiera puede verlos)
router.get('/', async (req, res) => {
  try {
    const dulces = await obtenerDulces();
    res.json(dulces);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 3. RUTAS PROTEGIDAS Y CON ARCHIVOS (NUEVAS) ---

// POST /dulces → agrega un dulce + SUBIR FOTO
// Usamos 'upload.single' para la foto y 'verificarToken' para seguridad
router.post('/', verificarToken, upload.single('foto'), async (req, res) => {
  try {
    // Si se subió una foto, guardamos el nombre del archivo en el body
    const datosDulce = {
      ...req.body,
      imagen: req.file ? req.file.filename : 'default.jpg'
    };
    
    await agregarDulceConLog(datosDulce);
    
    // Como es una API, en lugar de redirect, devolvemos un JSON
    res.status(201).json({ 
      status: "success", 
      message: "Dulce agregado con éxito",
      data: datosDulce 
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// PUT /dulces/:id → actualiza un dulce (Protegido con JWT)
router.put('/:id', verificarToken, async (req, res) => {
  try {
    await actualizarDulce(req.params.id, req.body);
    res.json({ status: "success", message: 'Dulce actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

// DELETE /dulces/:id → elimina un dulce (Protegido con JWT)
router.delete('/:id', verificarToken, async (req, res) => {
  try {
    await eliminarDulce(req.params.id);
    res.json({ status: "success", message: 'Dulce eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

module.exports = router;