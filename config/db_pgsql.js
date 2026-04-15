const { Pool } = require("pg");

require("dotenv").config({
  path: process.env.NODE_ENV === "production"
    ? ".env"
    : ".env.local"
});

// Datos de conexión del servidor de PostgreSQL guardadas en variables de entorno (.env)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // ESTE BLOQUE ES OBLIGATORIO en Render, si no se incluye, la conexión fallará con un error de certificado SSL
  },
});

module.exports = pool;
