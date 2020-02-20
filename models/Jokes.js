const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const jokesSchema = new Schema(
  {
    // The joke type
    type: {
        type: String,
        trim: true,
        

    }
  },
  { timestamps: true }
);

const Board = model("Board", boardSchema);
module.exports = Board;