const express = require('express');
const router = express.Router();
const {
  agregarDulceConLog,
  obtenerDulces,
  actualizarDulce,
  eliminarDulce
} = require('../services/servicesDulces');

// GET /dulces → lista todos los dulces
router.get('/', async (req, res) => {
  try {
    const dulces = await obtenerDulces();
    res.json(dulces);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /dulces → agrega un dulce
router.post('/', async (req, res) => {
  try {
    await agregarDulceConLog(req.body);
    res.redirect('/'); // vuelve a la página principal
  } catch (err) {
    res.status(500).send("Error al agregar dulce: " + err.message);
  }
});

// PUT /dulces/:id → actualiza un dulce
router.put('/:id', async (req, res) => {
  try {
    await actualizarDulce(req.params.id, req.body);
    res.json({ message: 'Dulce actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /dulces/:id → elimina un dulce
router.delete('/:id', async (req, res) => {
  try {
    await eliminarDulce(req.params.id);
    res.json({ message: 'Dulce eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;