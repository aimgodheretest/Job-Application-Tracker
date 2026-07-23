const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth");

const settingsController = require("../controllers/settingsController");

router.put("/change-password", authenticate, settingsController.changePassword);

router.delete(
  "/delete-account",
  authenticate,
  settingsController.deleteAccount,
);

module.exports = router;
