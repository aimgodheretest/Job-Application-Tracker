const express = require("express");

const auth = require("../middleware/auth");
const analyticsController = require("../controllers/analyticsController");

const router = express.Router();

router.get("/overview", auth, analyticsController.getOverview);

router.get(
  "/status-distribution",
  auth,
  analyticsController.getStatusDistribution,
);

router.get(
  "/monthly-applications",
  auth,
  analyticsController.getMonthlyApplications,
);

router.get(
  "/company-distribution",
  auth,
  analyticsController.getCompanyDistribution,
);

router.get("/recent-activity", auth, analyticsController.getRecentActivity);
router.get("/dashboard", auth, analyticsController.getDashboard);

module.exports = router;
