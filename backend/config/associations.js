const User = require("../models/user");
const Application = require("../models/application");
const Company = require("../models/company");
const Interview = require("../models/interview");

// User -> Applications
User.hasMany(Application, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Application.belongsTo(User, {
  foreignKey: "userId",
});

// User -> Companies
User.hasMany(Company, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Company.belongsTo(User, {
  foreignKey: "userId",
});

// User ↔ Interview
User.hasMany(Interview, {
  foreignKey: "userId",
  as: "interviews",
  onDelete: "CASCADE",
});

Interview.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Application ↔ Interview
Application.hasMany(Interview, {
  foreignKey: "applicationId",
  as: "interviews",
  onDelete: "CASCADE",
});

Interview.belongsTo(Application, {
  foreignKey: "applicationId",
  as: "application",
});

module.exports = {
  User,
  Application,
  Company,
  Interview,
};
