const express = require('express');
const helmet = require('helmet');
const morgan = require("morgan");
const pool = require('./config/db_pgsql'); // Credenciales de conexión a la base de datos

const app = express();
const port = process.env.PORT || 3000;  // Puerto definido en variables de entorno o 3000 por defecto


// Middlewares
app.use(morgan("dev")); // console.log de las peticiones al servidor para facilitar el desarrollo y debugging
app.use(helmet()); // Securización de cabeceras HTTP
app.use(express.json()); // Habilito recepción de JSON en servidor

// Test DB
pool.connect()
  .then(() => console.log('DB conectada'))
  .catch(err => console.error('Error DB:', err));


// Rutas
const entriesRoutes = require("./routes/entries.routes");
const authorsRoutes = require("./routes/authors.routes");

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/api', entriesRoutes);
app.use('/api', authorsRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});


app.listen(port, () => {
  console.log(`Funcionando en: http://localhost:${port}`)
});