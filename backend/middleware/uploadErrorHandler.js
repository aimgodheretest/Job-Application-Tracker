const multer = require("multer");

module.exports = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res.status(400).json({
          success: false,
          message: "File size cannot exceed 5 MB.",
        });

      default:
        return res.status(400).json({
          success: false,
          message: err.message,
        });
    }
  }

  return res.status(400).json({
    success: false,
    message: err.message,
  });
};
