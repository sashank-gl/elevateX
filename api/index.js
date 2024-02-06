const express = require("express");

// Middlewares
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const dbUri = process.env.DB_URI;

// Starting Express App
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

app.use(cors());

// Database Connection
mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Connected to ElevateX");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error: ", error);
  });
