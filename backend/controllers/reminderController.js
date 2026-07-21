const { Op } = require("sequelize");
const Reminder = require("../models/reminder");
const Application = require("../models/application");

async function createReminder(req, res) {
  try {
    const { title, description, reminderDate, reminderTime, applicationId } =
      req.body;

    // Validation
    if (!title || !reminderDate || !reminderTime || !applicationId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    //Validate Reminder Date
    const today = new Date().toISOString().split("T")[0];
    if (reminderDate < today) {
      return res.status(400).json({
        success: false,
        message: "Reminder date cannot be in the past",
      });
    }
    // Check if application belongs to logged-in user
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

    //Prevent Duplicate Pending Reminders
    const existingReminder = await Reminder.findOne({
      where: {
        userId: req.user.id,
        applicationId,
        title,
        reminderDate,
        reminderTime,
        status: "Pending",
      },
    });

    if (existingReminder) {
      return res.status(409).json({
        success: false,
        message: "A similar pending reminder already exists",
      });
    }

    const reminder = await Reminder.create({
      title,
      description,
      reminderDate,
      reminderTime,
      applicationId,
      userId: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Reminder created successfully",
      data: reminder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getAllReminders(req, res) {
  try {
    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Search
    const search = req.query.search || "";

    // Filters
    const status = req.query.status || "";
    const dateFrom = req.query.dateFrom || "";
    const dateTo = req.query.dateTo || "";

    // Sorting
    const sort = req.query.sort || "newest";

    const where = {
      userId: req.user.id,
    };

    if (search) {
      where.title = {
        [Op.like]: `%${search}%`,
      };
    }

    if (status) {
      where.status = status;
    }

    if (dateFrom && dateTo) {
      where.reminderDate = {
        [Op.between]: [dateFrom, dateTo],
      };
    } else if (dateFrom) {
      where.reminderDate = {
        [Op.gte]: dateFrom,
      };
    } else if (dateTo) {
      where.reminderDate = {
        [Op.lte]: dateTo,
      };
    }

    let order = [];

    switch (sort) {
      case "oldest":
        order = [
          ["reminderDate", "ASC"],
          ["reminderTime", "ASC"],
        ];
        break;

      case "title_asc":
        order = [["title", "ASC"]];
        break;

      case "title_desc":
        order = [["title", "DESC"]];
        break;

      case "newest":
      default:
        order = [
          ["reminderDate", "DESC"],
          ["reminderTime", "DESC"],
        ];
    }

    const { count, rows } = await Reminder.findAndCountAll({
      where,
      include: [
        {
          model: Application,
          as: "application",
          attributes: ["id", "company", "position"],
        },
      ],
      order,
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
      message: "Reminders fetched successfully",
      data: {
        reminders: rows,
        pagination,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getReminderById(req, res) {
  try {
    const { id } = req.params;

    const reminder = await Reminder.findOne({
      where: {
        id,
        userId: req.user.id,
      },
      include: [
        {
          model: Application,
          as: "application",
          attributes: ["id", "company", "position"],
        },
      ],
    });

    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: "Reminder not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Reminder fetched successfully",
      data: reminder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateReminder(req, res) {
  try {
    const { id } = req.params;

    const reminder = await Reminder.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: "Reminder not found",
      });
    }

    const {
      title,
      description,
      reminderDate,
      reminderTime,
      status,
      applicationId,
    } = req.body;

    // Use existing values if a field is not provided
    const updatedData = {
      title: title ?? reminder.title,
      description: description ?? reminder.description,
      reminderDate: reminderDate ?? reminder.reminderDate,
      reminderTime: reminderTime ?? reminder.reminderTime,
      status: status ?? reminder.status,
      applicationId: applicationId ?? reminder.applicationId,
    };

    // Validate reminder date
    const today = new Date().toISOString().split("T")[0];

    if (updatedData.reminderDate < today) {
      return res.status(400).json({
        success: false,
        message: "Reminder date cannot be in the past",
      });
    }

    // Validate application ownership
    const application = await Application.findOne({
      where: {
        id: updatedData.applicationId,
        userId: req.user.id,
      },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Prevent duplicate reminders
    const existingReminder = await Reminder.findOne({
      where: {
        userId: req.user.id,
        applicationId: updatedData.applicationId,
        title: updatedData.title,
        reminderDate: updatedData.reminderDate,
        reminderTime: updatedData.reminderTime,
        status: updatedData.status,
        id: {
          [Op.ne]: reminder.id,
        },
      },
    });

    if (existingReminder) {
      return res.status(409).json({
        success: false,
        message: "A similar reminder already exists",
      });
    }

    await reminder.update(updatedData);

    return res.status(200).json({
      success: true,
      message: "Reminder updated successfully",
      data: reminder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteReminder(req, res) {
  try {
    const { id } = req.params;

    const reminder = await Reminder.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: "Reminder not found",
      });
    }

    await reminder.destroy();

    return res.status(200).json({
      success: true,
      message: "Reminder deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function markReminderCompleted(req, res) {
  try {
    const { id } = req.params;

    const reminder = await Reminder.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: "Reminder not found",
      });
    }

    await reminder.update({
      status: "Completed",
    });

    return res.status(200).json({
      success: true,
      message: "Reminder marked as completed",
      data: reminder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getUpcomingReminders(req, res) {
  try {
    const today = new Date().toISOString().split("T")[0];

    const reminders = await Reminder.findAll({
      where: {
        userId: req.user.id,
        status: "Pending",
        reminderDate: {
          [Op.gte]: today,
        },
      },
      include: [
        {
          model: Application,
          as: "application",
          attributes: ["id", "company", "position"],
        },
      ],
      order: [
        ["reminderDate", "ASC"],
        ["reminderTime", "ASC"],
      ],
      limit: 5,
    });

    return res.status(200).json({
      success: true,
      message: "Upcoming reminders fetched successfully",
      data: reminders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  createReminder,
  getAllReminders,
  getReminderById,
  updateReminder,
  deleteReminder,
  markReminderCompleted,
  getUpcomingReminders,
};
