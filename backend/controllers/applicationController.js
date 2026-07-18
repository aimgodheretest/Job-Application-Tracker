const Application = require("../models/application");

async function createApplication(req, res) {
  try {
    const {
      company,
      position,
      location,
      jobType,
      status,
      salary,
      appliedDate,
      jobUrl,
      notes,
    } = req.body;

    if (!company || !position || !location || !jobType || !appliedDate) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const application = await Application.create({
      company,
      position,
      location,
      jobType,
      status,
      salary,
      appliedDate,
      jobUrl,
      notes,
      userId: req.user.id,
    });

    return res.status(201).json({
      message: "Application created successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function getApplications(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const { count, rows } = await Application.findAndCountAll({
      where: {
        userId: req.user.id,
      },
      limit,
      offset,
    });
    const totalPages = Math.max(1, Math.ceil(count / limit));
    const pagination = {
      totalRecords: count,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
    return res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      data: {
        applications: rows,
        pagination,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function getApplication(req, res) {
  try {
    const { id } = req.params;

    const application = await Application.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    return res.status(200).json({
      application,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function updateApplication(req, res) {
  try {
    const { id } = req.params;

    const application = await Application.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    const {
      company,
      position,
      location,
      jobType,
      status,
      salary,
      appliedDate,
      jobUrl,
      notes,
    } = req.body;

    await application.update({
      company,
      position,
      location,
      jobType,
      status,
      salary,
      appliedDate,
      jobUrl,
      notes,
    });

    return res.status(200).json({
      message: "Application updated successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function deleteApplication(req, res) {
  try {
    const { id } = req.params;

    const application = await Application.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    await application.destroy();

    return res.status(200).json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication,
};
