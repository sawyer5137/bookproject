const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.execute(
      "SELECT user_id as userId, username, password, created_at as createdAt, role_id as roleId FROM users WHERE username = ?",
      [username]
    );

    //checks if username exists in database
    const user = rows[0];
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    //checks if password for user matches
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error :'(" });
      }
      if (!result) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid username or password" });
      }

      delete user.password;

      //if username and password match, proceeds with login
      return res.json({
        success: true,
        message: "Login successful 😊",
        user: user,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error :'(" });
  }
});

module.exports = router;
