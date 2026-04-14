const multer = require('multer');
const path = require('path');

// Configuración de dónde y cómo se guardan los archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/uploads/'); // Carpeta de destino
    },
    filename: (req, file, cb) => {
        // Nombre único: fecha + nombre original
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

// Cambia tu fileFilter por este más sencillo:
const fileFilter = (req, file, cb) => {
    // Acepta el archivo si es imagen/jpeg, imagen/png, etc.
    if (file.mimetype.includes('image')) {
        cb(null, true);
    } else {
        // Si quieres ver qué tipo de archivo está llegando realmente:
        console.log("Tipo de archivo recibido:", file.mimetype);
        cb(new Error('Solo se permiten imágenes'), false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Límite de 2MB
    fileFilter: fileFilter
});

module.exports = upload;