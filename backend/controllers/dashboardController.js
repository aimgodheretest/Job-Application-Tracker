const Application = require("../models/application");

async function getDashboardData(req, res) {
  try {
    const userId = req.user.id;

    // Fetch all user applications
    const applications = await Application.findAll({
      where: { userId },
    });

    // Count by status
    const stats = {
      totalApplications: applications.length,
      applied: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
    };

    applications.forEach((application) => {
      switch (application.status) {
        case "Applied":
          stats.applied++;
          break;
        case "Interview":
          stats.interview++;
          break;
        case "Offer":
          stats.offer++;
          break;
        case "Rejected":
          stats.rejected++;
          break;
      }
    });

    // Fetch latest 5 applications
    const recentApplications = await Application.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    return res.status(200).json({
      ...stats,
      recentApplications,
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
