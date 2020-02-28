const express = require("express");
const router = express.Router();
const Board = require("../../models/Board");
const User = require("../../models/User");
const Memes = require('../../models/Memes');
const uploadCloud = require('../../config/cloudinary-setup');

// Update the board to add memes
router.post("/add-meme", uploadCloud.single("memeUrl"), (req, res, next) => {
    Memes.create({meme: req.file.url})
      .then(savedMeme => {
        Board.findByIdAndUpdate(req.body.boardId, {$push: {"memes": savedMeme._id}}, {new: true})
          .then(() => {
            res.redirect("back");
          })
          .catch(err => next(err));
      })
      .catch(err => console.log("Error saving meme: ", err))
  });

  module.exports = router;