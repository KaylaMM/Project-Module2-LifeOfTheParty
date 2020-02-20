const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDKEY,
    api_secret: process.env.CLOUDSECRET
});

<<<<<<< HEAD
var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "example-messageBoard-avatars", // The name of the folder in cloudinary
    allowedFormats: ["jpg", "png"],
    // params: { resource_type: 'raw' }, => this is in case you want to upload other type of files, not just images
=======
let storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "life-of-the-party-avatars", // The name of the folder in cloudinary
    allowedFormats: ["jpg", "png"],
>>>>>>> b2a1656e17d1ab6e31d128def413db8be08fa538
    filename: function(req, file, cb) {
        cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
    }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
