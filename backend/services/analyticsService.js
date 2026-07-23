const { fn, col, literal } = require("sequelize");
const sequelize = require("../config/db");
const Application = require("../models/application");
const Interview = require("../models/interview");
const SavedJob = require("../models/savedJob");
const getOverview = async (userId) => {
  const [applications, interviews, offers, rejected, savedJobs] =
    await Promise.all([
      Application.count({
        where: { userId },
      }),

      Interview.count({
        where: { userId },
      }),

      Application.count({
        where: {
          userId,
          status: "Offer",
        },
      }),

      Application.count({
        where: {
          userId,
          status: "Rejected",
        },
      }),

      SavedJob.count({
        where: { userId },
      }),
    ]);

  return {
    applications,
    interviews,
    offers,
    rejected,
    savedJobs,
  };
};
const getStatusDistribution = async (userId) => {
  const statusData = await Application.findAll({
    where: {
      userId,
    },

    attributes: ["status", [fn("COUNT", col("status")), "count"]],

    group: ["status"],

    order: [["status", "ASC"]],
  });

  return statusData.map((item) => ({
    status: item.status,
    count: Number(item.get("count")),
  }));
};
const getMonthlyApplications = async (userId) => {
  const monthlyData = await Application.findAll({
    where: {
      userId,
    },

    attributes: [
      [fn("MONTH", col("appliedDate")), "month"],
      [fn("COUNT", col("id")), "count"],
    ],

    group: [literal("MONTH(appliedDate)")],

    order: [[literal("MONTH(appliedDate)"), "ASC"]],

    raw: true,
  });

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return monthlyData.map((item) => ({
    month: monthNames[item.month - 1],
    count: Number(item.count),
  }));
};
const getCompanyDistribution = async (userId) => {
  const companyData = await Application.findAll({
    where: {
      userId,
    },

    attributes: ["company", [fn("COUNT", col("id")), "count"]],

    group: ["company"],

    order: [[fn("COUNT", col("id")), "DESC"]],

    limit: 5,

    raw: true,
  });

  return companyData.map((item) => ({
    company: item.company,
    count: Number(item.count),
  }));
};
const getRecentActivity = async (userId) => {
  const [applications, interviews, savedJobs] = await Promise.all([
    Application.findAll({
      where: { userId },

      attributes: ["position", "company", "createdAt"],

      order: [["createdAt", "DESC"]],

      limit: 10,

      raw: true,
    }),

    Interview.findAll({
      where: { userId },

      attributes: ["round", "applicationId", "createdAt"],

      raw: true,
    }),

    SavedJob.findAll({
      where: { userId },

      attributes: ["jobTitle", "companyName", "createdAt"],

      order: [["createdAt", "DESC"]],

      limit: 10,

      raw: true,
    }),
  ]);

  const activities = [];

  applications.forEach((item) => {
    activities.push({
      type: "Application",
      title: `Applied for ${item.position}`,
      subtitle: item.company,
      date: item.createdAt,
    });
  });

  interviews.forEach((item) => {
    activities.push({
      type: "Interview",
      title: `${item.round} Interview`,
      subtitle: item.application?.company || "",
      date: item.createdAt,
    });
  });

  savedJobs.forEach((item) => {
    activities.push({
      type: "Saved Job",
      title: item.jobTitle,
      subtitle: item.companyName,
      date: item.createdAt,
    });
  });

  activities.sort((a, b) => new Date(b.date) - new Date(a.date));

  return activities.slice(0, 10);
};

const getDashboard = async (userId) => {
  const [
    overview,
    statusDistribution,
    monthlyApplications,
    companyDistribution,
    recentActivity,
  ] = await Promise.all([
    getOverview(userId),
    getStatusDistribution(userId),
    getMonthlyApplications(userId),
    getCompanyDistribution(userId),
    getRecentActivity(userId),
  ]);

  return {
    overview,
    statusDistribution,
    monthlyApplications,
    companyDistribution,
    recentActivity,
  };
};
module.exports = {
  getOverview,
  getStatusDistribution,
  getMonthlyApplications,
  getCompanyDistribution,
  getRecentActivity,
  getDashboard,
};
