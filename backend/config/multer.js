const multer = require("multer");
const path = require("path");

// Allowed file types
const documentMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const imageMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// Dynamic destination based on document type
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const url = req.originalUrl;
    const { documentType } = req.body;

    let folder = "uploads/others";

    if (url.includes("/profile/image")) {
      return cb(null, "uploads/profileImages");
    }

    if (url.includes("/profile/resume")) {
      return cb(null, "uploads/profileResumes");
    }

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
  const url = req.originalUrl;

  if (url.includes("/profile/image")) {
    if (imageMimeTypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(new Error("Only JPG, PNG and WEBP images are allowed."));
  }

  if (documentMimeTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  return cb(new Error("Only PDF, DOC and DOCX files are allowed."));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

module.exports = upload;
