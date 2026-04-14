const author = require("../models/authors.model"); // Importar el modelo de la BBDD
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET http://localhost:3000/authors --> ALL
// GET http://localhost:3000/authors?email=hola@gmail.com --> por email
const getAuthors = async (req, res) => {
  try {
    let authors;
    if (req.query.email) {
      authors = await author.getAuthorsByEmail(req.query.email);
    } else {
      authors = await author.getAllAuthors();
    }
    res.status(200).json({
      success: true,
      data: authors,
      count: authors.length,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Error al obtener los autores",
      details: err.message,
    });
  }
};

// POST http://localhost:3000/api/authors
// let newAuthor = { name:"Alejandru", surname:"Regex", email:"alejandru@thebridgeschool.es", image:"https://randomuser.me/api/portraits/thumb/men/75.jpg" }

// Crear author por email
const createAuthor = async (req, res) => {
  const newAuthor = req.body; // {name,surname,email,image}
  const { name, surname, email, image } = req.body;
  if (!name || !surname || !email || !image) {
    return res.status(400).json({
      success: false,
      items_created: 0,
      data: newAuthor,
      error: "Faltan datos para crear el author",
    });
  }
  // Validar formato de email
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      items_created: 0,
      data: newAuthor,
      error: "Formato de email no válido",
    });
  }
  try {
    const response = await author.createAuthor(newAuthor);
    res.status(201).json({
      success: true,
      items_created: response,
      data: newAuthor,
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({
        success: false,
        items_created: 0,
        error: "Ya existe un author con ese email",
        details: err.message,
      });
    }
    res.status(400).json({
      success: false,
      items_created: 0,
      error: "Error al crear el author",
      details: err.message,
    });
  }
};

const updateAuthor = async (req, res) => {
  const { oldEmail, name, surname, email, image } = req.body;

  if (!oldEmail) {
    return res.status(400).json({
      success: false,
      error: "Falta el email original (oldEmail)"
    });
  }

  if (email && !emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: "Formato de email no válido"
    });
  }

  try {
    const response = await author.updateAuthor(
      oldEmail,
      { name, surname, email, image }
    );

    if (response === 0) {
      return res.status(404).json({
        success: false,
        error: `No se encontró author con email ${oldEmail}`
      });
    }

    res.status(200).json({
      success: true,
      items_edited: response,
      message: `Author actualizado (${oldEmail})`
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};


const deleteAuthor = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      items_deleted: 0,
      error: "Falta el email para borrar el author",
    });
  }

  try {
    const response = await author.deleteAuthor(email);
    // manejamos el no encontrar la entry a borrar como un error, aunque realmente no es un error de ejecución sino un caso de "no encontrado"
    if (response === 0) {
      return res.status(404).json({
        success: false,
        items_deleted: response,
        error: `No se encontró ningún author con el email '${email}'`,
      });
    }

    res.status(200).json({
      success: true,
      items_deleted: response,
      message: `Se ha borrado el author con el email '${email}'`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      items_deleted: 0,
      data: { email },
      error: err.message,
    });
  }
};

module.exports = {
  getAuthors, // --> GET
  createAuthor, // --> POST
  updateAuthor, // --> PUT
  deleteAuthor, //--> DELETE
};
