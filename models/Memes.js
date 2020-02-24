const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const memesSchema = new Schema(
  {
    // The joke type
    meme: {
        type: String,
        trim: true,
    }
  },
  { timestamps: true }
);

const Memes = model("Jokes", memesSchema);
module.exports = Memes;