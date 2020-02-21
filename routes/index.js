const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
    res.render("index");
});

axios.get(apiUrl)
    .then(responseFromAPI => console.log("The response from API: ", responseFromAPI))
    .catch(err => console.log("Error while getting the data: ", err));


module.exports = router;
