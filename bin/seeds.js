const mongoose = require("mongoose");
const Jokes = require("../models/Jokes");

mongoose
    .connect("mongodb://localhost/life-of-the-party", {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(x => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`
        );
    })
    .catch(err => {
        console.error("Error connecting to mongo", err);
    });


const jokes = {

}


Jokes.create(jokes, err => {
    if (err) {
      throw err;
    }
    console.log(`Created ${jokes.length} books`);
    mongoose.connection.close();
  });