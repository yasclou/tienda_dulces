// Middleware de registro general
app.use(async (req, res, next) => {
    const fecha = new Date().toLocaleString();
    const registro = `[${fecha}] Acceso a: ${req.method} ${req.url}\n`;
    await fs.appendFile(path.join(__dirname, 'src', 'logs', 'log.txt'), registro);
    next(); // -> indica ruta
});