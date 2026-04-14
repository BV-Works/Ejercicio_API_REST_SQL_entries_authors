const queries = require("../queries/entries.queries");
const pool = require("../config/db_pgsql");

// GET all
const getAllEntries = async () => {
  const data = await pool.query(queries.getAllEntries);
  return data.rows;
};

// GET by email
const getEntriesByEmail = async (email) => {
  const data = await pool.query(queries.getEntriesByEmail, [email]);
  return data.rows;
};

// CREATE
const createEntry = async ({ title, content, email, category }) => {
  const data = await pool.query(queries.createEntry, [
    title,
    content,
    email,
    category,
  ]);

  return data.rowCount;
};

// UPDATE
const updateEntry = async (oldTitle, { title, content, email, category }) => {
  const data = await pool.query(queries.updateEntry, [
    title,
    content,
    email,
    category,
    oldTitle,
  ]);

  return data.rowCount;
};

// DELETE
const deleteEntry = async (title) => {
  const data = await pool.query(queries.deleteEntry, [title]);

  return data.rowCount;
};

module.exports = {
  getEntriesByEmail,
  getAllEntries,
  createEntry,
  updateEntry,
  deleteEntry,
};
