const multer = require("multer");
const path = require("path");

// Allowed file types
const allowedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// Dynamic destination based on document type
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { documentType } = req.body;

    let folder = "uploads/others";

    switch (documentType) {
      case "Resume":
        folder = "uploads/resumes";
        break;

      case "Cover Letter":
        folder = "uploads/coverLetters";
        break;

      case "Offer Letter":
        folder = "uploads/offerLetters";
        break;

      default:
        folder = "uploads/others";
    }

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// File validation
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(new Error("Only PDF, DOC and DOCX files are allowed."));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

module.exports = upload;
