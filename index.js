const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(cors());

require("dotenv").config();

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome on Marvel app" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
