const { Op } = require("sequelize");
const SavedJob = require("../models/savedJob");

// CREATE
async function createSavedJob(req, res) {
  try {
    const {
      companyName,
      jobTitle,
      location,
      jobType,
      salary,
      source,
      jobUrl,
      deadline,
      status,
      notes,
    } = req.body;

    if (!companyName || !jobTitle) {
      return res.status(400).json({
        success: false,
        message: "Company name and job title are required",
      });
    }

    const savedJob = await SavedJob.create({
      companyName,
      jobTitle,
      location,
      jobType,
      salary,
      source,
      jobUrl,
      deadline,
      status,
      notes,
      userId: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Saved job created successfully",
      data: savedJob,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// GET ALL
async function getSavedJobs(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const search = req.query.search || "";
    const status = req.query.status || "";
    const jobType = req.query.jobType || "";
    const sort = req.query.sort || "newest";

    const where = {
      userId: req.user.id,
    };

    if (search) {
      where[Op.or] = [
        {
          companyName: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          jobTitle: {
            [Op.like]: `%${search}%`,
          },
        },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (jobType) {
      where.jobType = jobType;
    }

    let order = [];

    switch (sort) {
      case "oldest":
        order = [["createdAt", "ASC"]];
        break;

      case "company_asc":
        order = [["companyName", "ASC"]];
        break;

      case "company_desc":
        order = [["companyName", "DESC"]];
        break;

      case "deadline":
        order = [["deadline", "ASC"]];
        break;

      default:
        order = [["createdAt", "DESC"]];
    }

    const { count, rows } = await SavedJob.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    const totalPages = Math.max(1, Math.ceil(count / limit));

    return res.status(200).json({
      success: true,
      message: "Saved jobs fetched successfully",
      data: {
        savedJobs: rows,
        pagination: {
          totalRecords: count,
          totalPages,
          currentPage: page,
          limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// GET ONE
async function getSavedJob(req, res) {
  try {
    const { id } = req.params;

    const savedJob = await SavedJob.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!savedJob) {
      return res.status(404).json({
        success: false,
        message: "Saved job not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: savedJob,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// UPDATE
async function updateSavedJob(req, res) {
  try {
    const { id } = req.params;

    const savedJob = await SavedJob.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!savedJob) {
      return res.status(404).json({
        success: false,
        message: "Saved job not found",
      });
    }

    await savedJob.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Saved job updated successfully",
      data: savedJob,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// DELETE
async function deleteSavedJob(req, res) {
  try {
    const { id } = req.params;

    const savedJob = await SavedJob.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!savedJob) {
      return res.status(404).json({
        success: false,
        message: "Saved job not found",
      });
    }

    await savedJob.destroy();

    return res.status(200).json({
      success: true,
      message: "Saved job deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  createSavedJob,
  getSavedJobs,
  getSavedJob,
  updateSavedJob,
  deleteSavedJob,
};
