const express = require("express");

const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

const auth = require("../middleware/auth");

const router = express.Router();

router.route("/").get(auth, getProfile).put(auth, updateProfile);

module.exports = router;
