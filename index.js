const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const pool = require('./src/db/conexion');
const dulcesRoutes = require('./src/routes/dulces'); // CRUD API
const app = express();
const port = process.env.PORT || 3000;

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src', 'public')));

// --- Configurar Handlebars ---
app.set('views', path.join(__dirname, 'src', 'views'));
app.engine(
  'handlebars',
  engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
  })
);
app.set('view engine', 'handlebars');

// --- Rutas API REST para CRUD de dulces ---
app.use('/dulces', dulcesRoutes);

// --- Ruta principal (página de la tienda) ---
app.get('/', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM dulces ORDER BY id');
    res.render('home', {
      title: 'Neko Nippon Sweets 🍬',
      dulces: resultado.rows,
    });
  } catch (error) {
    console.error(error);
    res.send('Hubo un error al cargar la tienda');
  }
});

// --- Ruta de venta directa (resta stock) ---
app.get('/vender/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'UPDATE dulces SET stock = stock - 1 WHERE id = $1 AND stock > 0 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(400).send('No hay stock disponible');
    }

    // Registrar en logs
    const fecha = new Date().toLocaleString();
    const mensajeLog = `[${fecha}] ÉXITO: Se vendió 1 unidad de ID ${id}\n`;
    await fs.appendFile(path.join(__dirname, 'src', 'logs', 'log.txt'), mensajeLog);

    res.redirect('/');
  } catch (error) {
    const fecha = new Date().toLocaleString();
    const mensajeError = `[${fecha}] ERROR: Venta ID ${req.params.id}. Motivo: ${error.message}\n`;
    await fs.appendFile(path.join(__dirname, 'src', 'logs', 'log.txt'), mensajeError);
    res.status(500).send('Error al actualizar stock');
  }
});

app.get('/borrar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM dulces WHERE id = $1', [id]);

    // Registrar en log
    const fecha = new Date().toLocaleString();
    const mensajeLog = `[${fecha}] ÉXITO: Se eliminó el dulce con ID ${id}\n`;
    await fs.appendFile(path.join(__dirname, 'src', 'logs', 'log.txt'), mensajeLog);

    res.redirect('/'); // vuelve a la página principal
  } catch (error) {
    const fecha = new Date().toLocaleString();
    const mensajeError = `[${fecha}] ERROR: Falló ID ${req.params.id}. Motivo: ${error.message}\n`;
    await fs.appendFile(path.join(__dirname, 'src', 'logs', 'log.txt'), mensajeError);
    res.status(500).send('Error al borrar');
  }
});

// --- Iniciar servidor ---
app.listen(port, () => {
  console.log(`✅ Servidor iniciado en http://localhost:${port}`);
});