const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication,
} = require("../controllers/applicationController");

router.post("/", auth, createApplication);
router.get("/", auth, getApplications);
router.get("/:id", auth, getApplication);
router.put("/:id", auth, updateApplication);
router.delete("/:id", auth, deleteApplication);

module.exports = router;
