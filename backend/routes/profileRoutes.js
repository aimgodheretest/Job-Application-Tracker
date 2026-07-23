const express = require("express");
const upload = require("../config/multer");
const uploadErrorHandler = require("../middleware/uploadErrorHandler");
const {
  getProfile,
  updateProfile,
  uploadProfileImage,
} = require("../controllers/profileController");

const auth = require("../middleware/auth");

const router = express.Router();

router.route("/").get(auth, getProfile).put(auth, updateProfile);

router.post(
  "/image",
  auth,
  upload.single("image"),
  uploadErrorHandler,
  uploadProfileImage,
);

module.exports = router;
