const express = require("express");
const router = express.Router();
const axios = require("axios");
const apiUrl = `https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,political,racist,sexist&idRange=0-10`;

/* GET home page */
router.get("/", (req, res, next) => {
    res.render("index");
});

axios
    .get(apiUrl)
    .then(responseFromAPI => console.log("The response from API: ", responseFromAPI))
    .catch(err => console.log("Error while getting the data: ", err));


module.exports = router;
