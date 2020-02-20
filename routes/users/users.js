const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const cloudUpload = require("../../config/cloudinary-setup");

router.get("/profile", (req, res, next) => {
    res.render("users/userProfile", currentUser);
}); 

router.post("/profile/update", (req, res, next) => {
    User.findByIdAndUpdate(req.session.user._id, req.body, { new: true })
        .then(updatedUser => {
            req.session.user = updatedUser;
            res.locals.currentUser = req.session.user;
            res.redirect("back");
        })
        .catch(err => next(err));
});

router.post(
    "/profile/file-upload",
    cloudUpload.single("uploadedImage"),
    (req, res, next) => {
        User.findByIdAndUpdate(
            req.session.user._id,
            { avatar: req.file.url },
            { new: true }
        )
            .then(updatedUser => {
                req.session.user = updatedUser;
                res.locals.currentUser = req.session.user;
                res.redirect("back");
            })
            .catch(err => next(err));
    }
);

router.get("/profile/:userId", (req, res, next) => {
    User.findById(req.params.userId)
        .then(userFromDB => {
            res.render("users/userProfile", { userFromDB });
        })
        .catch(err => next(err));
});

module.exports = router;
