const { agregarDulceConLog } = require('./src/services/servicesDulces');

async function prueba() {
  try {
    await agregarDulceConLog({ nombre: 'KitKat', precio: 2000, stock: 15 });
    console.log('Dulce agregado correctamente');
  } catch (err) {
    console.error('Error al agregar dulce:', err.message);
  }
}

prueba();