const express = require("express");
const app = express();
const cors = require("cors");

const port = 8081;
const userRoutes = require("./routes/user");

//Middleware
app.use(
  cors({
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

//ROUTES
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send(
    "<h1 style='display: flex; justify-content: center; height: 100vh;'>The backend is working 😁</h1>"
  );
});

const server = app.listen(port, () => {
  console.log(`Listening for requests on port: ${port}`);
});
