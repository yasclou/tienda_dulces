const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // Buscamos el token en los encabezados (Authorization)
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({
            status: "error",
            message: "No se proporcionó un token de seguridad."
        });
    }

    try {
        // Quitamos la palabra "Bearer " si viniera en el token
        const tokenLimpio = token.split(" ")[1] || token;
        
        // Verificamos si el token es válido usando nuestra clave secreta
        const decoded = jwt.verify(tokenLimpio, process.env.JWT_SECRET || 'clave_secreta_gatuna');
        
        // Guardamos los datos del usuario en la petición para usarla después
        req.usuario = decoded;
        
        next(); // ¡Todo bien! Puedes pasar al siguiente paso
    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: "Token inválido o expirado."
        });
    }
};

module.exports = verificarToken;