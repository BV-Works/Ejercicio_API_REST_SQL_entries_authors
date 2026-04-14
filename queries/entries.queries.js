const queries = {
  getEntriesByEmail: `
    SELECT e.title,e.content,e.date,e.category,a.name,a.surname, a.email AS email_author, a.image
    FROM entries AS e
    INNER JOIN authors AS a
    ON e.id_author=a.id_author
    WHERE a.email=$1
    ORDER BY e.title;
  `,

  getAllEntries: `
    SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.email AS email_author, a.image
    FROM entries AS e
    INNER JOIN authors AS a
    ON e.id_author=a.id_author
    ORDER BY e.title;
  `,

  createEntry: `
    INSERT INTO entries(title,content,id_author,category) 
    VALUES (
      $1,
      $2,
      (SELECT id_author FROM authors WHERE email=$3),
      $4
    )
  `,

  updateEntry: `
    UPDATE entries
    SET title=$1,
        content=$2,
        date=NOW(), 
        id_author=(SELECT id_author FROM authors WHERE email=$3),
        category=$4
    WHERE title=$5
  `,

  deleteEntry: `
    DELETE FROM entries
    WHERE title = $1
  `,

  createTable: `
    CREATE TABLE entries (
      id_entry serial PRIMARY KEY,
      title varchar(100) NOT NULL,
      content text NOT NULL,
      date date DEFAULT CURRENT_DATE,
      id_author int,
      category varchar(15),
      FOREIGN KEY (id_author) REFERENCES authors(id_author)
    );
  `,

  dropTable: `
    DROP TABLE IF EXISTS entries;
  `,
};

module.exports = queries;
