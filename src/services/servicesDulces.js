const pool = require('../db/conexion');
const fs = require('fs');

// Función para agregar un dulce
async function agregarDulceConLog(dulce) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Agregamos la columna 'imagen' y el parámetro $4
    await client.query(
      'INSERT INTO dulces (nombre, precio, stock, imagen) VALUES ($1, $2, $3, $4)',
      [dulce.nombre, dulce.precio, dulce.stock, dulce.imagen] // <--- ¡No olvides el dulce.imagen!
    );
    
    await client.query('COMMIT');
    
    fs.appendFileSync(
      'src/logs/log.txt',
      `Se agregó dulce: ${dulce.nombre} (Imagen: ${dulce.imagen}) - ${new Date()}\n`
    );
  } catch (err) {
    await client.query('ROLLBACK');
    fs.appendFileSync(
      'src/logs/log.txt',
      `Error al agregar dulce: ${dulce.nombre} - ${err.message} - ${new Date()}\n`
    );
    throw err;
  } finally {
    client.release();
  }
}

// Función para obtener todos los dulces
async function obtenerDulces() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM dulces ORDER BY id');
    return res.rows;
  } finally {
    client.release();
  }
}

// Función para actualizar un dulce
async function actualizarDulce(id, datos) {
  const client = await pool.connect();
  try {
    await client.query(
      'UPDATE dulces SET nombre=$1, precio=$2, stock=$3 WHERE id=$4',
      [datos.nombre, datos.precio, datos.stock, id]
    );
    fs.appendFileSync(
      'src/logs/log.txt',
      `Se actualizó dulce ID ${id} - ${new Date()}\n`
    );
  } catch (err) {
    fs.appendFileSync(
      'src/logs/log.txt',
      `Error al actualizar dulce ID ${id} - ${err.message} - ${new Date()}\n`
    );
    throw err;
  } finally {
    client.release();
  }
}

// Función para eliminar un dulce
async function eliminarDulce(id) {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM dulces WHERE id=$1', [id]);
    fs.appendFileSync(
      'src/logs/log.txt',
      `Se eliminó dulce ID ${id} - ${new Date()}\n`
    );
  } catch (err) {
    fs.appendFileSync(
      'src/logs/log.txt',
      `Error al eliminar dulce ID ${id} - ${err.message} - ${new Date()}\n`
    );
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { agregarDulceConLog, obtenerDulces, actualizarDulce, eliminarDulce };