const { Pool } = require('pg');

require('dotenv').config()

// Datos de conexión del servidor de PostgreSQL guardadas en variables de entorno (.env)
const pool = new Pool({ 
    user: process.env.PG_USER, 
    host: process.env.PG_HOST, 
    database: process.env.PG_DATABASE, 
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})

module.exports = pool;