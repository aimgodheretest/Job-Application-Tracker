const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getDashboardStats,
  getRecentApplications,
} = require("../controllers/dashboardController");

router.get("/stats", auth, getDashboardStats);
router.get("/recent", auth, getRecentApplications);

module.exports = router;
