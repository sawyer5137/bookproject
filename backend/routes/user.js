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

router.put("/:userId/books/:bookId", async (req, res) => {
  const { userId, bookId } = req.params;
  const { rating, haveRead, hardCover } = req.body;

  try {
    await pool.query(
      `UPDATE user_books 
       SET rating = ?, have_read = ?, hard_cover = ? 
       WHERE user_id = ? AND book_id = ?`,
      [rating, haveRead, hardCover, userId, bookId]
    );
    res.status(200).json({ message: "User book updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user book" });
  }
});

router.post("/:userId/books", async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  await pool.query(
    `INSERT INTO user_books 
                    (user_id, book_id, have_read, hard_cover, rating)
                    VALUES
                    (?, ?, 0, 0, 0)`,
    [userId, bookId]
  );
  res.status(201).json({ message: "Book added to collection" });
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while adding the book" });
  }
});

router.delete("/:userId/books/:bookId", async (req, res) => {
  const { userId, bookId } = req.params;

  try {
    await pool.query(
      `DELETE FROM user_books WHERE user_id = ? && book_id = ?`,
      [userId, bookId]
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while removing the book" });
  }
});

module.exports = router;
