const { Pool } = require('pg');
require('dotenv').config();

// conexión usando los datos del archivo .env
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Mensaje en consola :)
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Error de conexión a la DB:', err.stack);
    } else {
        console.log('🐘 Conectado a la base de datos "tienda_dulces"');
    }
});

module.exports = pool;