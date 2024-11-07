const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

//getUserByID
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT user_id as userId, username, created_at as createdAt, role_id as roleId FROM users WHERE user_id = ?",
      [userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = rows[0];
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving user" });
  }
});

//getUsersBooksById
router.get("/:userId/books", async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await pool.query(
      `select
        b.book_id as id,
        b.title,
        concat(a.author_fname, ' ', a.author_lname) as author,
        ub.rating,
        ub.have_read,
        ub.hard_cover
      from user_books ub
      join books b
        on ub.book_id = b.book_id
      join authors a
        on b.author_id = a.author_id
        where ub.user_id = ?`,
      userId
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving user's books" });
  }
});

module.exports = router;
