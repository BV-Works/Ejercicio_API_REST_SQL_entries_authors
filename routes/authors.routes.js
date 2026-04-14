const express = require('express');
const authorsController = require("../controllers/authors.controller");
const router = express.Router();

router
  .route('/authors')
  .get(authorsController.getAuthors)
  .post(authorsController.createAuthor)
  .put(authorsController.updateAuthor)
  .delete(authorsController.deleteAuthor);

module.exports = router;

// GET http://localhost:3000/api/authors --> ALL
// GET http://localhost:3000/api/authors?email=hola@gmail.com --> por email
// POST http://localhost:3000/api/authors
/*
{
    "id_author": 1,
    "name": "Alejandru",
    "surname": "Regex",
    "email": "alejandru@thebridgeschool.es",
    "image": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
}
    */
// PUT http://localhost:3000/api/authors
/*
{
    "id_author": 1,
    "name": "Alejandru",
    "surname": "Regex",
    "email": "alejandru@thebridgeschool.es",
    "image": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
}
*/
// DELETE http://localhost:3000/api/authors
/*
{
    "email": "alejandru@thebridgeschool.es"
}
*/