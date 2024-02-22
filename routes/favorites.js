const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const User = require("../models/User");

// ADD FAVORITE ROUTE
router.post("/favorites/add", isAuthenticated, async (req, res) => {
  console.log(req.body);
  try {
    if (Object.hasOwn(req.body, "comicId")) {
      if (req.user.favorites.comic.includes(req.body.comicId)) {
        return res.status(409).json({ message: "ID already exists" });
      } else {
        req.user.favorites.comic.push(req.body.comicId);
        await req.user.save();
      }
    } else if (Object.hasOwn(req.body, "characterId")) {
      if (req.user.favorites.character.includes(req.body.characterId)) {
        return res.status(409).json({ message: "ID already exists" });
      } else {
        req.user.favorites.character.push(req.body.characterId);
        await req.user.save();
      }
    }
    res.status(201).json(req.user.favorites);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// DELETE FAVORITE ROUTE
router.post("/favorites/delete", isAuthenticated, async (req, res) => {
  console.log(req.body);
  try {
    if (Object.hasOwn(req.body, "comicId")) {
      if (!req.user.favorites.comic.includes(req.body.comicId)) {
        return res.status(409).json({ message: "ID not found in favorites" });
      } else {
        const index = req.user.favorites.comic.indexOf(req.body.comicId);
        req.user.favorites.comic.splice(index, 1);
        await req.user.save();
      }
    } else if (Object.hasOwn(req.body, "characterId")) {
      if (!req.user.favorites.character.includes(req.body.characterId)) {
        return res.status(409).json({ message: "ID not found in favorites" });
      } else {
        const index = req.user.favorites.character.indexOf(
          req.body.characterId
        );
        req.user.favorites.character.splice(index, 1);
        await req.user.save();
      }
    }
    res.status(200).json(req.user.favorites);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// FAVORITE LIST ROUTE
router.get("/favorites", isAuthenticated, (req, res) => {
  try {
    res.status(200).json(req.user.favorites);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
