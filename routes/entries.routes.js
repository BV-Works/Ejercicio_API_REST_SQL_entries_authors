const express = require('express');
const entriesController = require("../controllers/entries.controller");
const router = express.Router();

router
  .route('/entries')
  .get(entriesController.getEntries)
  .post(entriesController.createEntry)
  .put(entriesController.updateEntry)
  .delete(entriesController.deleteEntry);

module.exports = router;

// GET http://localhost:3000/api/entries --> ALL
// GET http://localhost:3000/api/entries?email=hola@gmail.com --> por email
// POST http://localhost:3000/api/entries
/*
{
    "title":"noticia desde Node",
    "content":"va a triunfar esto2",
    "email":"alejandru@thebridgeschool.es",
    "category":"sucesos"
}
    */
// PUT http://localhost:3000/api/entries
/*
{
    "title":"noticia desde Node",
    "content":"va a triunfar esto3",
    "email":"jimbo@thebridgeschool.es"
}
*/
// DELETE http://localhost:3000/api/entries
/*
{
    "title":"noticia desde Node"
}
*/