const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const axios = require("axios");
const apiUrl = `https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,political,racist,sexist&idRange=0-10`;
=======
>>>>>>> b2a1656e17d1ab6e31d128def413db8be08fa538

/* GET home page */
router.get("/", (req, res, next) => {
    res.render("index");
});

<<<<<<< HEAD
axios
    .get(apiUrl)
    .then(responseFromAPI => console.log("The response from API: ", responseFromAPI))
    .catch(err => console.log("Error while getting the data: ", err));


module.exports = router;
=======
module.exports = router;
>>>>>>> b2a1656e17d1ab6e31d128def413db8be08fa538
