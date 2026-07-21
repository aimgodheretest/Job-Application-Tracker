const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  createReminder,
  getAllReminders,
  getReminderById,
  updateReminder,
  deleteReminder,
  markReminderCompleted,
  getUpcomingReminders,
} = require("../controllers/reminderController");

// CRUD
router.route("/").post(auth, createReminder).get(auth, getAllReminders);

// Dashboard
router.get("/upcoming", auth, getUpcomingReminders);

// Mark reminder completed
router.patch("/:id/complete", auth, markReminderCompleted);

// CRUD by id
router
  .route("/:id")
  .get(auth, getReminderById)
  .put(auth, updateReminder)
  .delete(auth, deleteReminder);

module.exports = router;
