const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/User");

// SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username) {
      return res.status(400).json({ message: "Username is missing" });
    } else if (!email) {
      return res.status(400).json({ message: "Email is missing" });
    } else if (!password) {
      return res.status(400).json({ message: "Password is missing" });
    }

    const user = await User.findOne({ email: email });
    if (user) {
      res.status(409).json({ message: "User already exists" });
    } else {
      const salt = uid2(32);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(64);
      console.log("SALT", salt, "HASH", hash, "TOKEN", token);

      const newUser = new User({
        email: email,
        username: username,
        token: token,
        hash: hash,
        salt: salt,
      });

      await newUser.save();

      res.status(201).json({
        id: newUser._id,
        username: newUser.username,
        token: newUser.token,
      });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// LOGIN ROUTE

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email address or password is incorrect" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email address or password is incorrect" });
    } else {
      const newHash = SHA256(password + user.salt).toString(encBase64);
      if (newHash !== user.hash) {
        return res
          .status(400)
          .json({ message: "Email address or password is incorrect" });
      } else {
        res.json({
          id: user._id,
          token: user.token,
          username: user.username,
        });
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
