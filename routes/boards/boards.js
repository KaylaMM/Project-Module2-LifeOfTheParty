const express = require("express");
const router = express.Router();
const Board = require("../../models/Board");
const User = require("../../models/User");
const Memes = require('../../models/Memes');

// Display Profile
router.get("/", (req, res, next) => {
  Board.find()
    .then(allBoards => {
      const boardsArray = allBoards.map(board => {
        const obj = {
          ...board._doc,
          isOwner: req.session.user
            ? board.author._id.toString() === req.session.user._id.toString()
            : false
        };
        // board.isOwner = board.author._id === req.session.user._id;
        return obj;
      });

      const data = {
        boards: boardsArray,
        // here we can use noBoards as a variable that can be called on the view page in order to use {{#if noBoards}} for conditional display.
        // now we will be able to display one message if there are no boards (something like "There are no boards to display at this time. Be the first to create a new board!") or show the boards that exists if there are some
        noBoards: boardsArray.length === 0
      };
      res.render("users/userProfile", data);
    })
    .catch(err => next(err));
});

//Route for board details
router.get("/:boardId", (req, res, next) => {
  console.log("here")
  console.log(req.params.boardId);
  Board.findById(req.params.boardId)
    .populate("memes")
    .then(boardFromDB => {
      console.log(boardFromDB);
      res.render("boards/boardDetails", { boardFromDB });
    })
    .catch(err => console.log(err));
});

// display the specific board page
router.get("/details/:boardId", (req, res, next) => {
  // the findById below is using a deep populate which is used when you are going to populate the information within data that you are populating. Notice that unlike a normal populate, on a deep populate you have to set the path to the first data point that your going to populate and then path again into the data type that you just populated to find the other data.
  // if there is more than one data point that you have to populate you can just link populates like the example below
  // Board.findById(req.params.id).populate('messages').populate('followers')
  Board.findById(req.params.boardId)
    .populate({
      path: "messages",
      populate: [{ path: "replies" }, { path: "author" }]
    })
    .populate("followers")
    .then(boardFromDB => {
      const data = {
        // this is a ternary operator. It is the same as doing an if else conditional statement but looks cleaner and can be used for conditional setting of values like the example below.
        noMessages: boardFromDB.messages.length === 0 ? true : false,
        board: boardFromDB,
        messages: boardFromDB.messages.reverse()
      };
      // here we will set the local variable for the bodyClass to be something other than what we set in app.js in order to track the page change. We can then use this for styling or script file(which is what we will be using it for).
      res.locals.bodyClass = "messageBoardDetails";

      res.render("boards/boardDetails", data);
    })
    .catch(err => next(err));
});

// create a board for messages
router.post("/create", (req, res, next) => {
  console.log("new board info >>>>>>>>>>>> ", req.body);
  console.log("req ==> ==> ==> ==> ==> ", req);
  // for some of our routes, we may want the user to be logged in like on this one that a user is required in order to add the author to the board. For cases like this we can do a simple check for req.session.user and the user is not logged in then we can redirect them to the login page
  if (!req.session.user) {
    res.redirect("/auth/login");
    // here we will add a return to stop the rest of the route from running otherwise we may get errors for not finding req.session.user or possibly create blank boards.
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


router.post("/update/:boardId", (req, res, next) => {
  console.log(req.params.boardId)
  Board.findByIdAndUpdate(req.params.boardId, {new: true})
  .then( updatedBoard => {
    console.log(updatedBoard)
    res.render("/boards/boardDetails", {updatedBoard})
  }).catch(err => console.log(err));
})











// delete a board, only the author or admin should be able too delete a board
router.post("/delete/:boardId", (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/auth/login");
  }

  Board.findByIdAndDelete(req.params.boardId)
    .then(() => {
      User.findByIdAndUpdate(
        req.session.user._id,
        { $pull: { userBoards: req.params.boardId } },
        { new: true }
      )
        .then(() => {
          res.redirect("/boards");
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



router.get("/add-message/:boardId/:messageId", (req, res, next) => {
  // when updating we must add {new: true} in order to get the updated information from the db, otherwise you will get the information that is on the db prior to the update
  Board.findByIdAndUpdate(
    req.params.boardId,
    {
      $push: { messages: req.params.messageId }
    },
    { new: true }
  )
    .then(updatedBoard => {
      res.status(200).json(updatedBoard);
      // next();
    })
    .catch(err => next(err));
});

module.exports = router;
