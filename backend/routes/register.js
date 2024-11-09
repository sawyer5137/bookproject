const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.execute(
      "SELECT user_id FROM users WHERE username = ?",
      [username]
    );

    if (rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.execute(
      "INSERT INTO users (username, password, created_at, role_id) VALUES (?, ?, ?, ?)",
      [username, hashedPassword, new Date(), 2]
    );

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
