# 📚 API REST SQL - Entries & Authors

API REST desarrollada con **Node.js, Express y PostgreSQL** que permite gestionar entradas de blog (`entries`) y autores (`authors`), realizando operaciones CRUD completas y consultas relacionales entre ambas tablas.

---
# 🚀 URL de producción

👉 API desplegada en Render:

https://ejercicio-api-rest-sql-entries-authors-bmyv.onrender.com

---
# 🏗️ Estructura del proyecto

```bash
src/
│
├── config/
│   └── db_pgsql.js
│
├── controllers/
│   ├── entries.controller.js
│   └── authors.controller.js
│
├── models/
│   ├── entries.model.js
│   └── authors.model.js
│
├── queries/
│   ├── entries.queries.js
│   └── authors.queries.js
│
├── routes/
│   ├── entries.routes.js
│   └── authors.routes.js
│
├── app.js
├── package.json
└── package-lock.json

---
🧱 Tecnologías utilizadas
Node.js
Express
PostgreSQL
pg (node-postgres)
dotenv
helmet
morgan

---
📦 Instalación local
npm install

---
▶️ Ejecución del proyecto

Desarrollo

npm run dev

Producción

npm start

---
⚙️ Variables de entorno

Crear un archivo .env o .env.local:

DB_HOST=tu_host
DB_USER=tu_user
DB_DATABASE=tu_database
DB_PASSWORD=tu_password
DB_PORT=5432
PORT=3000

---
📌 Endpoints principales

✍️ ENTRIES
🔹 Obtener todas las entries
GET /api/entries

Ejemplo respuesta:
[
  {
    "title": "Noticia desde Node",
    "content": "va a triunfar esto2",
    "date": "2022-03-20T23:00:00.000Z",
    "category": "sucesos",
    "name": "Alejandru",
    "surname": "Regex",
    "email_author": "alejandru@thebridgeschool.es",
    "image": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
  }
]

🔹 Obtener entries por email
GET /api/entries?email=alejandru@thebridgeschool.es

🔹 Crear entry
POST /api/entries
Body:
{
  "title": "Noticia desde Node",
  "content": "va a triunfar esto2",
  "email": "alejandru@thebridgeschool.es",
  "category": "sucesos"
}

🔹 Actualizar entry
PUT /api/entries
Body:
{
  "oldTitle": "Título anterior",
  "title": "Título nuevo",
  "content": "contenido actualizado",
  "email": "autor@email.com",
  "category": "sucesos"
}

🔹 Eliminar entry
DELETE /api/entries
Body:
{
  "title": "Título de la noticia"
}

👤 AUTHORS

🔹 Obtener todos los authors
GET /api/authors
🔹 Obtener author por email
GET /api/authors?email=alejandru@thebridgeschool.es

🔹 Crear author
POST /api/authors
Body:
{
  "name": "Nombre",
  "surname": "Apellido",
  "email": "email@ejemplo.com",
  "image": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
}

🔹 Actualizar author
PUT /api/authors
Body:
{
  "oldEmail": "email@antiguo.com",
  "name": "Nuevo nombre",
  "surname": "Nuevo apellido",
  "email": "nuevo@email.com",
  "image": "url"
}

🔹 Eliminar author
DELETE /api/authors
Body:
{
  "email": "email@ejemplo.com"
}

🔗 Relación entre tablas
Cada entry pertenece a un author
Relación mediante id_author
Consultas con JOIN para obtener datos combinados

📊 Ejemplo de respuesta combinada
{
  "title": "Noticia",
  "content": "Contenido...",
  "date": "2022-03-20T23:00:00.000Z",
  "category": "sucesos",
  "name": "Alejandru",
  "surname": "Regex",
  "email_author": "alejandru@thebridgeschool.es",
  "image": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
}

---
🛡️ Seguridad
Helmet para cabeceras HTTP seguras
Validación de emails
Manejo de errores centralizado
Constraints en PostgreSQL (UNIQUE en title/email)

---
👨‍💻 Autor: BV-Works (Jaime Rubio)

Proyecto desarrollado como ejercicio de API REST con PostgreSQL + Express