const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const path = require("path");

//Middleware
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(
  session({
    // secret: process.env.SESSION_SECRET_KEY,
    secret: "testSecret",
    secure: false,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(express.json());

app.use(express.json());

//ROUTES
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));

app.use(express.static("../frontend/dist"));

app.get("/", (req, res) => {
  res.send(
    "<h1 style='display: flex; justify-content: center; height: 100vh;'>The backend is working 😁</h1>"
  );
});

app.all("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening for requests on port: ${process.env.PORT}`);
});
