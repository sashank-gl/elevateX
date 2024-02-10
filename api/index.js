const express = require("express");

// Middlewares
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

// Starting Express App
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

app.use(cors());

// Routes
