const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

const usersRoutes = require("./routes/users");
app.use(usersRoutes);

const favoritesRoutes = require("./routes/favorites");
app.use(favoritesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome on Marvel app" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
