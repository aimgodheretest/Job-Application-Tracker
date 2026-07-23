const express = require("express");
const upload = require("../config/multer");
const uploadErrorHandler = require("../middleware/uploadErrorHandler");
const {
  getProfile,
  updateProfile,
  uploadProfileImage,
  deleteProfileImage,
  uploadResume,
  deleteResume,
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

router.delete("/image", auth, deleteProfileImage);

router.post(
  "/resume",
  auth,
  upload.single("resume"),
  uploadErrorHandler,
  uploadResume,
);

router.delete("/resume", auth, deleteResume);

module.exports = router;
