const queries = require("../queries/authors.queries");
const pool = require("../config/db_pgsql");

// GET all
const getAllAuthors = async () => {
  const data = await pool.query(queries.getAllAuthors);
  return data.rows;
};

// GET by email
const getAuthorsByEmail = async (email) => {
  const data = await pool.query(queries.getAuthorsByEmail, [email]);
  return data.rows;
};

// CREATE
const createAuthor = async ({ name, surname, email, image }) => {
  const data = await pool.query(queries.createAuthor, [
    name,
    surname,
    email,
    image,
  ]);

  return data.rowCount;
};

// UPDATE
const updateAuthor = async (oldEmail, { name, surname, email, image }) => {
  const data = await pool.query(queries.updateAuthor, [
    name,
    surname,
    email,
    image,
    oldEmail,
  ]);

  return data.rowCount;
};

// DELETE
const deleteAuthor = async (email) => {
  const data = await pool.query(queries.deleteAuthor, [email]);

  return data.rowCount;
};

module.exports = {
  getAllAuthors,
  getAuthorsByEmail,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
