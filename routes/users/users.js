const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const cloudUpload = require("../../config/cloudinary-setup");

<<<<<<< HEAD
// Here will create a route to lead to the users profile page in order to allow the user to modify and update their information.
// Since we have currentUser set up as a local variable in the app.js, we will not have to get the users details from the DB prior to loading the details page.
// this route will allow the current user to view their profile and also be able to edit their profile.
router.get("/profile", (req, res, next) => {
    res.render("users/userProfile");
});

// this route will be so that we can update the users profile information if they edit any of the fields. Since each sessions user is unique then we can create a route without having to pass the users id in the endpoint.
=======
router.get("/profile", (req, res, next) => {
    res.render("users/userProfile", currentUser);
}); 

>>>>>>> b2a1656e17d1ab6e31d128def413db8be08fa538
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
