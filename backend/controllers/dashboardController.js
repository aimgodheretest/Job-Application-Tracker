const { fn, col } = require("sequelize");
const Application = require("../models/application");

async function getDashboardData(req, res) {
  try {
    const userId = req.user.id;

    const totalApplications = await Application.count({
      where: { userId },
    });

    const applied = await Application.count({
      where: {
        userId,
        status: "Applied",
      },
    });

    const interview = await Application.count({
      where: {
        userId,
        status: "Interview",
      },
    });

    const offer = await Application.count({
      where: {
        userId,
        status: "Offer",
      },
    });

    const rejected = await Application.count({
      where: {
        userId,
        status: "Rejected",
      },
    });

    const stats = {
      totalApplications,
      applied,
      interview,
      offer,
      rejected,
    };

    // Fetch latest 5 applications
    const recentApplications = await Application.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    return res.status(200).json({
      success: true,
      message: "Dashboard fetched successfully",
      data: {
        stats,
        recentApplications,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  getDashboardData,
};
