const fs = require("fs");
const { Application, ApplicationDocument } = require("../config/associations");

async function uploadDocument(req, res) {
  try {
    const { id } = req.params;
    const { documentType } = req.body;

    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a document.",
      });
    }

    // Validate document type
    if (!documentType) {
      fs.unlinkSync(req.file.path);

      return res.status(400).json({
        success: false,
        message: "Document type is required.",
      });
    }

    // Verify application ownership
    const application = await Application.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!application) {
      fs.unlinkSync(req.file.path);

      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    // Save document metadata
    const document = await ApplicationDocument.create({
      applicationId: application.id,
      documentType,
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
    });

    return res.status(201).json({
      success: true,
      message: "Document uploaded successfully.",
      data: document,
    });
  } catch (error) {
    // Remove uploaded file if something fails after upload
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getApplicationDocuments(req, res) {
  try {
    const { id } = req.params;

    // Verify application ownership
    const application = await Application.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    // Fetch all documents for this application
    const documents = await ApplicationDocument.findAll({
      where: {
        applicationId: application.id,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Documents fetched successfully.",
      data: documents,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteDocument(req, res) {
  try {
    const { id } = req.params;

    // Find document
    const document = await ApplicationDocument.findByPk(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found.",
      });
    }

    // Verify ownership through application
    const application = await Application.findOne({
      where: {
        id: document.applicationId,
        userId: req.user.id,
      },
    });

    if (!application) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this document.",
      });
    }

    // Delete file from disk
    if (fs.existsSync(document.filePath)) {
      fs.unlinkSync(document.filePath);
    }

    // Delete database record
    await document.destroy();

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  uploadDocument,
  getApplicationDocuments,
  deleteDocument,
};
