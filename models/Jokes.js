const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const jokesSchema = new Schema(
  {
    // The joke type
    joke: {
        type: String,
        trim: true,
    }
  },
  { timestamps: true }
);

const Jokes = model("Jokes", jokesSchema);
module.exports = Jokes;