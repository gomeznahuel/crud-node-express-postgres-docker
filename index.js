const express = require("express");
const bodyparser = require("body-parser");
const sequelize = require("./util/database");
const User = require("./models/user");

const app = express();

// Parse incoming requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Test route
app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Hello World!" });
});

// CRUD Routes
app.use("/users", require("./routes/users"));

// Error handling
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

// Connect to database and start server
sequelize
  .sync()
  .then(result => {
    console.log("Connected to database");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
