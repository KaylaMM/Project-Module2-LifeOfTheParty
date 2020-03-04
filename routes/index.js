const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");
const Board = require("../models/Board");
const apiUrl = `https://meme-api.herokuapp.com/gimme/100`;

/* GET home page */
router.get("/", (req, res, next) => {
  if (req.session.user) {
    User.findById(req.session.user._id)
      .populate("userBoards")
      .then(currentUser => {
        axios
          .get(apiUrl)
          .then(responseFromAPI => {
            res.render("index", {
              memes: responseFromAPI.data.memes,
              userBoards: currentUser.userBoards
            });
          })
          .catch(err => console.log("Error while getting the data: ", err));
      })
      .catch(err => console.log("Error while getting the data: ", err));
  } else {
    res.render("index");
  }
});

module.exports = router;
