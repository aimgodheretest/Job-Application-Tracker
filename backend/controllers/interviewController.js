const { Op } = require("sequelize");
const Interview = require("../models/interview");
const Application = require("../models/application");

const createInterview = async (req, res) => {
  try {
    const {
      applicationId,
      round,
      date,
      time,
      mode,
      location,
      meetingLink,
      interviewer,
      notes,
    } = req.body;

    const application = await Application.findOne({
      where: {
        id: applicationId,
        userId: req.user.id,
      },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.status === "Rejected") {
      return res.status(400).json({
        success: false,
        message: "Cannot schedule an interview for a rejected application.",
      });
    }

    if (mode === "Online" && !meetingLink) {
      return res.status(400).json({
        success: false,
        message: "Meeting link is required for online interviews.",
      });
    }

    if (mode === "Offline" && !location) {
      return res.status(400).json({
        success: false,
        message: "Location is required for offline interviews.",
      });
    }

    const existingInterview = await Interview.findOne({
      where: {
        userId: req.user.id,
        date,
        time,
        status: {
          [Op.ne]: "Cancelled",
        },
      },
    });

    if (existingInterview) {
      return res.status(409).json({
        success: false,
        message:
          "You already have an interview scheduled at this date and time.",
      });
    }

    const interview = await Interview.create({
      applicationId,
      userId: req.user.id,
      round,
      date,
      time,
      mode,
      location,
      meetingLink,
      interviewer,
      notes,
    });

    // Automatically update application status
    if (application.status === "Applied") {
      await application.update({
        status: "Interview",
      });
    }

    res.status(201).json({
      success: true,
      message: "Interview scheduled successfully",
      data: interview,
    });
  } catch (error) {
    console.error("Create Interview Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllInterviews = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 5,
      search = "",
      applicationId = "",
      status = "",
      mode = "",
      round = "",
      dateFrom = "",
      dateTo = "",
      sort = "newest",
    } = req.query;

    const whereClause = {
      userId: req.user.id,
    };

    if (applicationId) {
      whereClause.applicationId = applicationId;
    }

    if (status) {
      whereClause.status = status;
    }

    if (mode) {
      whereClause.mode = mode;
    }

    if (round) {
      whereClause.round = round;
    }

    if (dateFrom && dateTo) {
      whereClause.date = {
        [Op.between]: [dateFrom, dateTo],
      };
    }

    if (search) {
      whereClause[Op.or] = [
        {
          interviewer: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          notes: {
            [Op.like]: `%${search}%`,
          },
        },
      ];
    }

    let order = [["date", "DESC"]];

    switch (sort) {
      case "oldest":
        order = [["date", "ASC"]];
        break;

      case "newest":
        order = [["date", "DESC"]];
        break;

      default:
        order = [["date", "DESC"]];
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Interview.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Application,
          as: "application",
          attributes: ["id", "company", "position"],
        },
      ],
      order,
      limit: Number(limit),
      offset: Number(offset),
    });

    res.status(200).json({
      success: true,
      data: {
        interviews: rows,
        pagination: {
          totalRecords: count,
          totalPages: Math.ceil(count / limit),
          currentPage: Number(page),
          limit: Number(limit),
          hasNextPage: Number(page) < Math.ceil(count / limit),
          hasPrevPage: Number(page) > 1,
        },
      },
    });
  } catch (error) {
    console.error("Get Interviews Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
      include: [
        {
          model: Application,
          as: "application",
          attributes: ["company", "position"],
        },
      ],
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    res.status(200).json({
      success: true,
      data: interview,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateInterview = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    if (
      req.body.mode === "Online" &&
      !req.body.meetingLink &&
      interview.mode !== "Online"
    ) {
      return res.status(400).json({
        success: false,
        message: "Meeting link is required for online interviews.",
      });
    }

    if (
      req.body.mode === "Offline" &&
      !req.body.location &&
      interview.mode !== "Offline"
    ) {
      return res.status(400).json({
        success: false,
        message: "Location is required for offline interviews.",
      });
    }

    await interview.update(req.body);

    res.status(200).json({
      success: true,
      message: "Interview updated successfully",
      data: interview,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    await interview.destroy();

    res.status(200).json({
      success: true,
      message: "Interview deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getUpcomingInterviews = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const interviews = await Interview.findAll({
      where: {
        userId: req.user.id,
        date: {
          [Op.gte]: today,
        },
        status: "Scheduled",
      },
      include: [
        {
          model: Application,
          as: "application",
          attributes: ["company", "position"],
        },
      ],
      order: [
        ["date", "ASC"],
        ["time", "ASC"],
      ],
      limit: 5,
    });

    res.status(200).json({
      success: true,
      message: "Upcoming interviews fetched successfully",
      data: interviews,
    });
  } catch (error) {
    console.error("Upcoming Interviews Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createInterview,
  getAllInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
  getUpcomingInterviews,
};
