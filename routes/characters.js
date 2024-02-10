const express = require("express");
const router = express.Router();

const axios = require("axios");

router.get("/characters", async (req, res) => {
  let page;

  if (Number(req.query.page) < 1) {
    page = 1;
  } else {
    page = Number(req.query.page);
  }

  let limit = 100;

  if (req.query.limit) {
    limit = Number(req.query.limit);
  }

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?name=${
        req.query.name
      }&skip=${(page - 1) * limit}&limit=${limit}&apiKey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
