const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const boardSchema = new Schema(
  {
    // The person who creates the board
    author: {
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

    message: {


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

module.exports = Board;

