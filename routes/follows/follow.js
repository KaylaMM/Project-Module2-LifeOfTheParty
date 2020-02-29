const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const Follow = require('../../models/Follow');


router.get("/followId, (req, res, next) => {
   Follow.findbyId(req.params.followId)
     .populate("follows")
     .then(followFromDB);
     res.render("follows/followers", followFromDB);
   })


