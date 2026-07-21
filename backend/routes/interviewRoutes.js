const express = require("express");
const router = express.Router();

const {
  createInterview,
  getAllInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
  getUpcomingInterviews,
} = require("../controllers/interviewController");

const auth = require("../middleware/auth");

router.route("/").post(auth, createInterview).get(auth, getAllInterviews);

router.get("/upcoming", auth, getUpcomingInterviews);

router
  .route("/:id")
  .get(auth, getInterviewById)
  .put(auth, updateInterview)
  .delete(auth, deleteInterview);

module.exports = router;
