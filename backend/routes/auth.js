const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
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
      //sets session data
      req.session.user = {
        userId: user.userId,
        username: user.username,
        roleId: user.roleId,
      };

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

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

router.post("/register", async (req, res) => {
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

//used in the frontend root to check the clients session cookies
//if valid session cookies are found, returns the user else return null
router.get("/check-session", async (req, res) => {
  if (req.session && req.session.user) {
    try {
      const [rows] = await pool.execute(
        "SELECT user_id as userId, username, password, created_at as createdAt, role_id as roleId FROM users WHERE user_id = ?",
        [req.session.user.userId]
      );
      const user = rows[0];
      delete user.password;
      res.json({ user });
    } catch (err) {
      console.error(err);
      res.json(null);
    }
  } else {
    res.json(null);
  }
});

module.exports = router;
