const express = require("express");
const router = express.Router();
const Board = require("../../models/Board");
const User = require("../../models/User");
const Memes = require('../../models/Memes');

//Route for board details
router.get("/:boardId", (req, res, next) => {
  Board.findById(req.params.boardId)
    .populate("memes")
    .then(boardFromDB => {
      res.render("boards/boardDetails", {boardFromDB});
    })
    .catch(err => console.log(err));
});

// Create a board for memes
router.post("/create", (req, res, next) => {
  console.log("new board info >>>>>>>>>>>> ", req.body);
  console.log("req ==> ==> ==> ==> ==> ", req);
  if (!req.session.user) {
    res.redirect("/auth/login");
    return;
  }

  const newBoard = req.body;
  console.log({ newBoard });
  newBoard.author = req.session.user._id;
  console.log(newBoard.author);

  Board.create(newBoard)
    .then(newlyCreatedBoard => {
      console.log(newlyCreatedBoard);
      User.findByIdAndUpdate(
        req.session.user._id,
        { $push: { userBoards: newlyCreatedBoard._id } },
        { new: true }
      )
        .then(updatedUser => {
          console.log(">>>>", req.session.user, updatedUser.userBoards);
          req.session.user = updatedUser;
          res.redirect(`/users/profile`);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

// Update board
router.post("/update/:boardId", (req, res, next) => {
  console.log(req.body);
  Board.findByIdAndUpdate(req.params.boardId, {title: req.body.title}, {new: true})
  .then(boardFromDB => {
    console.log(boardFromDB)
    res.render("boards/boardDetails", {boardFromDB})
  }).catch(err => console.log(err));
})

// Delete board
router.post("/delete/:boardId", (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/auth/login");
  }

  Board.findByIdAndDelete(req.params.boardId)
    .then(() => {
      User.findByIdAndUpdate(
        req.session.user._id,
        {$pull: {userBoards: req.params.boardId}},
        {new: true}
      )
        .then(updatedUser => {
          req.session.user = updatedUser;
          res.locals.currentUser = req.session.user;
          res.redirect(`/users/profile`);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

// update the board to either add or remove a follower
router.post("/followers/:boardId", (req, res, next) => {
  Board.findById(req.params.boardId)
    .then(boardFromDB => {
      if (boardFromDB.followers.includes(req.session.user._id)) {
        boardFromDB.pull(req.session.user._id);
      } else {
        boardFromDB.push(req.session.user._id);
      }
      boardFromDB
        .save()
        .then(updatedBoard => {
          res.redirect("back");
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

module.exports = router;
