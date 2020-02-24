const express = require("express");
const router = express.Router();
const axios = require("axios");
const apiUrl = `https://meme-api.herokuapp.com/gimme/100`;

/* GET home page */
router.get("/", (req, res, next) => {
    axios
    .get(apiUrl)
    .then(responseFromAPI => {
        console.log("The response from API: ", responseFromAPI.data.memes)
        res.render("index", responseFromAPI)})
    .catch(err => console.log("Error while getting the data: ", err));
});

module.exports = router;