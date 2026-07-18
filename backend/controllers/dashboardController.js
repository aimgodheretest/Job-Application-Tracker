const Application = require("../models/Application");

// async function getDashboardStats(req, res) {
//   try {
//     const userId = req.param.id;

//     //count
//     const totalApplications = await Application.count({
//       where: { userId },
//     });
//     //applied
//     const applied = await Application.count({
//       where: {
//         userId,
//         status: "Applied",
//       },
//     });
//     //interview
//     const interview = await Application.count({
//       where: {
//         userId,
//         status: "Interview",
//       },
//     });
//     // offer
//     const offer = await Application.count({
//       where: {
//         userId,
//         status: "Offer",
//       },
//     });
//     //rejected
//     const rejected = await Application.count({
//       where: {
//         userId,
//         status: "Rejected",
//       },
//     });

//     //recentApplications
//     const recentApplications = await Application.findAll({
//       where: { userId },
//       order: [["createdAt", "DESC"]],
//       limit: 5,
//     });

//     return res.status(200).json({
//       totalApplications,
//       applied,
//       interview,
//       offer,
//       rejected,
//       recentApplications,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// }
async function getDashboardStats(req, res) {
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
async function getRecentApplications(req, res) {
  try {
    const userId = req.user.id;

    const recentApplications = await Application.findAll({
      where: {
        userId,
      },
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    return res.status(200).json({
      success: true,
      message: "Recent applications fetched successfully",
      data: recentApplications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
module.exports = {
  getDashboardStats,
  getRecentApplications,
};
