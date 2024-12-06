const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

//get all books
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
                        select
                          b.book_id as id,
                          b.title, concat(a.author_fname, ' ', a.author_lname) as author,
                          b.pub_year as 'year',
                          g.genre_name as genre,
                          b.pages,
                          p.publisher_name as publisher
                        from books b
                          join publishers p on p.publisher_id = b.publisher_id
                          join authors a on a.author_id = b.author_id
                          join genres g on g.genre_id = b.genre_id`);
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving books" });
  }
});

module.exports = router;
