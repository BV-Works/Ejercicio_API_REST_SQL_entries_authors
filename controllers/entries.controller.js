const entry = require("../models/entries.model"); // Importar el modelo de la BBDD
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET http://localhost:3000/entries --> ALL
// GET http://localhost:3000/entries?email=hola@gmail.com --> por email
const getEntries = async (req, res) => {
  try {
    let entries;
    if (req.query.email) {
      entries = await entry.getEntriesByEmail(req.query.email);
    } else {
      entries = await entry.getAllEntries();
    }
    res.status(200).json({
      success: true,
      data: entries,
      count: entries.length,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Error al obtener las entries",
      details: err.message,
    });
  }
};

// POST http://localhost:3000/api/entries
// let newEntry = { title:"noticia desde Node", content:"va a triunfar esto2", email:"alejandru@thebridgeschool.es", category:"sucesos" }

// Crear entry por email
const createEntry = async (req, res) => {
  const newEntry = req.body; // {title,content,email,category}
  const { title, content, email, category } = req.body;
  if (!title || !content || !email || !category) {
    return res.status(400).json({
      success: false,
      items_created: 0,
      data: newEntry,
      error: "Faltan datos para crear la entry",
    });
  }
  // Validar formato de email
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      items_created: 0,
      data: newEntry,
      error: "Formato de email no válido",
    });
  }
  try {
    const response = await entry.createEntry(newEntry);
    res.status(201).json({
      success: true,
      items_created: response,
      data: newEntry,
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({
        success: false,
        items_created: 0,
        error: "Ya existe una entry con ese título",
        details: err.message,
      });
    }
    res.status(400).json({
      success: false,
      items_created: 0,
      error: "Error al crear la entry",
      details: err.message,
    });
  }
};

const updateEntry = async (req, res) => {
  const editedEntry = req.body; // {oldTitle,title,content,email,category}
  const { oldTitle, title, content, email, category } = req.body;
  if (!oldTitle) {
    return res.status(400).json({
      success: false,
      error: "Falta el título original (oldTitle)",
    });
  }

  if (!title) {
    return res.status(400).json({
      success: false,
      items_edited: 0,
      data: editedEntry,
      error: "Faltan datos obligatorios: title",
    });
  }

  if (email) {
    if (!emailRegex.test(email)) {
      // validamos el formato del email, pero no es un dato obligatorio para actualizar una entry,
      // por eso solo lanzamos error si el email existe pero no es válido.
      return res.status(400).json({
        success: false,
        items_edited: 0,
        data: editedEntry,
        error: "Formato de email no válido",
      });
    } else {
      // si el email cumple con el formato, validamos que exista un author con ese email para no dejar entries sin autor
      const authorExists = await author.getAuthorsByEmail(email);

      if (!authorExists.length) {
        return res.status(404).json({
          success: false,
          error: "Author no existe",
        });
      }
    }
  }

  try {
    const response = await entry.updateEntry(oldTitle, {
      title,
      content,
      email,
      category,
    });
    // manejamos el no encontrar la entry a actualizar como un error, aunque realmente no es un error de ejecución sino un caso de "no encontrado"
    if (response === 0) {
      return res.status(404).json({
        success: false,
        items_edited: 0,
        data: editedEntry,
        error: `No se encontró entry con título '${oldTitle}'`,
      });
    }

    res.status(200).json({
      success: true,
      items_edited: response,
      data: editedEntry,
      message: `Entry actualizada (${oldTitle})`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      items_edited: 0,
      data: editedEntry,
      error: err.message,
    });
  }
};

const deleteEntry = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      items_deleted: 0,
      error: "Falta el título para borrar la entry",
    });
  }

  try {
    const response = await entry.deleteEntry(title);
    // manejamos el no encontrar la entry a borrar como un error, aunque realmente no es un error de ejecución sino un caso de "no encontrado"
    if (response === 0) {
      return res.status(404).json({
        success: false,
        items_deleted: response,
        error: `No se encontró ninguna entry con el título '${title}'`,
      });
    }

    res.status(200).json({
      success: true,
      items_deleted: response,
      message: `Se ha borrado la entry '${title}'`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      items_deleted: 0,
      data: { title },
      error: err.message,
    });
  }
};

module.exports = {
  getEntries, // --> GET
  createEntry, // --> POST
  updateEntry, // --> PUT
  deleteEntry, //--> DELETE
};
