const mongoose = require("mongoose");
const { Schema, model } = mongoose;

<<<<<<< HEAD
// in order to use .populate in the route file, you must first have the type for what you will populate as Schema.Types.ObjectId and make sure to ref (reference) the model that it will be searching that ID for in your db collection
// author: {type: Schema.Types.ObjectId, ref: 'User'}
// if your using an array of object ids then it would look like the code below
// messages: {type: [{type: Schema.Types.ObjectId, ref: 'Message'}]}
// notice that when you reference you use the capitalization of the model that it is referencing

const boardSchema = new Schema(
  {
    // the user that created the board
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    // the title for the board that will be displayed to users
    title: {
      type: String
    },
    // the messages that belong to this board
    messages: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Message"
        }
      ]
    },
    // the users that are following this board
    followers: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User"
=======

const boardSchema = new Schema(
  {
    // The person who creates the board
    auth: {
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
    comments: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Message"
>>>>>>> b2a1656e17d1ab6e31d128def413db8be08fa538
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
