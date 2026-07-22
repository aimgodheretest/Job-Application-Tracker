const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const upload = require("../config/multer");

const {
  uploadDocument,
  getApplicationDocuments,
  deleteDocument,
} = require("../controllers/documentController");

const uploadErrorHandler = require("../middleware/uploadErrorHandler");

router.get("/application/:id", auth, getApplicationDocuments);

router.post(
  "/application/:id",
  auth,
  upload.single("document"),
  uploadErrorHandler,
  uploadDocument,
);

router.delete("/:id", auth, deleteDocument);
module.exports = router;
