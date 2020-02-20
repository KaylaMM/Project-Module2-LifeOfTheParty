const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const boardSchema = new Schema(
  {
    // The person who creates the board
<<<<<<< HEAD
    author: {

=======
    auth: {
>>>>>>> b2a1656e17d1ab6e31d128def413db8be08fa538
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      ]
    },
    // the title of each category on the board 
    title: {
      type: String
    },
    // the jokes that will belong to the board
    jokes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Jokes'
        }
      ],
    },
    // the comments for jokes on the user's board
<<<<<<< HEAD
    message: {

=======
    comments: {
>>>>>>> b2a1656e17d1ab6e31d128def413db8be08fa538
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Message"
        }
      ]
    }
  },
  { timestamps: true }
);

const Board = model("Board", boardSchema);
<<<<<<< HEAD

module.exports = Board;

=======
module.exports = Board;
>>>>>>> b2a1656e17d1ab6e31d128def413db8be08fa538
