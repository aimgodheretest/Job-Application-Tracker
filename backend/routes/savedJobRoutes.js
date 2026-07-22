const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  createSavedJob,
  getSavedJobs,
  getSavedJob,
  updateSavedJob,
  deleteSavedJob,
} = require("../controllers/savedJobController");

router.post("/", auth, createSavedJob);
router.get("/", auth, getSavedJobs);
router.get("/:id", auth, getSavedJob);
router.put("/:id", auth, updateSavedJob);
router.delete("/:id", auth, deleteSavedJob);

module.exports = router;
