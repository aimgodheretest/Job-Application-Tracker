const analyticsService = require("../services/analyticsService.js");

exports.getOverview = async (req, res) => {
  try {
    const data = await analyticsService.getOverview(req.user.id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics overview.",
    });
  }
};
exports.getStatusDistribution = async (req, res) => {
  try {
    const data = await analyticsService.getStatusDistribution(req.user.id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch status distribution.",
    });
  }
};

exports.getMonthlyApplications = async (req, res) => {
  try {
    const data = await analyticsService.getMonthlyApplications(req.user.id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch monthly applications.",
    });
  }
};

exports.getCompanyDistribution = async (req, res) => {
  try {
    const data = await analyticsService.getCompanyDistribution(req.user.id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch company distribution.",
    });
  }
};

exports.getRecentActivity = async (req, res) => {
  try {
    const data = await analyticsService.getRecentActivity(req.user.id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch recent activity.",
    });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const data = await analyticsService.getDashboard(req.user.id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard analytics.",
    });
  }
};
