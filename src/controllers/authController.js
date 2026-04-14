const jwt = require('jsonwebtoken');
const pool = require('../db/conexion');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscamos al usuario en la base de datos (SQL puro)
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        const usuario = result.rows[0];

        // NOTA: En un proyecto real usarías bcrypt para comparar contraseñas
        if (usuario && usuario.password === password) {
            // Si los datos son correctos, firmamos el token
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email },
                process.env.JWT_SECRET || 'clave_secreta_gatuna',
                { expiresIn: '1h' }
            );

            return res.json({
                status: "success",
                message: "¡Bienvenido a Neko Nippon Sweets!",
                token: token
            });
        }

        res.status(401).json({ status: "error", message: "Credenciales incorrectas" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

module.exports = { login };