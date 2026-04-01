const fs = require('fs').promises;
require('dotenv').config();
const pool = require('./src/db/conexion');
const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

const path = require('path'); // Importante para manejar rutas de carpetas

// 1. Configurar Handlebars -> Apuntando a src/views
app.set('views', path.join(__dirname, 'src', 'views')); 
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts')
}));
app.set('view engine', 'handlebars');

// 2. Carpeta pública -> Apuntando a src/public
app.use(express.static(path.join(__dirname, 'src', 'public')));

// 3. Importar rutas --Cuando se crean en src/routes
// const dulcesRoutes = require('./src/routes/dulces.routes');
// app.use('/dulces', dulcesRoutes);

// 3. Ruta de prueba (Parte 1)
app.get('/', async (req, res) => {
    try {
        // 1. Pedimos los dulces a la tabla que creamos en pgAdmin
        const resultado = await pool.query('SELECT * FROM dulces');
        
        // 2. Se a 'home'
        // 'resultado.rows' es la lista de dulces
        res.render('home', { 
            title: 'Neko Nippon Sweets 🍬', 
            dulces: resultado.rows 
        });
    } catch (error) {
        console.error(error);
        res.send("Hubo un error al cargar la tienda");
    }
});

// Ruta para borrar un dulce por ID (Parte 2.3)
app.get('/borrar/:id', async (req, res) => {
    // 1. Definir ID -> fuera de la URL)
    const { id } = req.params; 

    try {
        // 2. borrar
        await pool.query('DELETE FROM dulces WHERE id = $1', [id]);
        
        // 3. definir 'id' para log
        const fecha = new Date().toLocaleString();
        const mensajeLog = `[${fecha}] ÉXITO: Se eliminó el dulce con ID ${id}\n`;
        
        await fs.appendFile(path.join(__dirname, 'src', 'logs', 'log.txt'), mensajeLog);

        console.log(`✅ Dulce ${id} borrado.`);
        res.redirect('/');
    } catch (error) {
        // cuendo es error también con "id"
        const fecha = new Date().toLocaleString();
        const mensajeError = `[${fecha}] ERROR: Falló ID ${id}. Motivo: ${error.message}\n`;
        
        await fs.appendFile(path.join(__dirname, 'src', 'logs', 'log.txt'), mensajeError);
        res.status(500).send("Error al borrar");
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/agregar', async (req, res) => {
    try {
        const { nombre, precio, stock } = req.body;
        
        // Insertar en la base de datos (Parte 2.2)
        await pool.query(
            'INSERT INTO dulces (nombre, precio, stock) VALUES ($1, $2, $3)',
            [nombre, precio, stock]
        );
        
        res.redirect('/'); // para ver los nuevos dulces, recarga
    } catch (error) {
        console.error("Error al agregar:", error);
        res.status(500).send("No se pudo agregar el dulce");
    }
});

app.get('/vender/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Se actualiza el stock restando 1 (Parte 2.3)
        await pool.query('UPDATE dulces SET stock = stock - 1 WHERE id = $1 AND stock > 0', [id]);
        
        res.redirect('/');
    } catch (error) {
        res.status(500).send("Error al actualizar stock");
    }
});

app.listen(port, () => {
    console.log(`✅ Servidor iniciado en http://localhost:${port}`);
});