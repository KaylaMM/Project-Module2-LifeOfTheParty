const express = require("express");
const router = express.Router();
const axios = require("axios");
const apiUrl = `https://meme-api.herokuapp.com/gimme/100`;

/* GET home page */
router.get("/", (req, res, next) => {
    axios
    .get(apiUrl)
    .then(responseFromAPI => {
        
        // console.log("The response from API: ", responseFromAPI.data.memes)
        responseFromAPI.data.memes.forEach(oneMeme => {
            console.log({oneMeme});
        })
        res.render("index", {memes: responseFromAPI.data.memes})
    })
    .catch(err => console.log("Error while getting the data: ", err));
});

module.exports = router;