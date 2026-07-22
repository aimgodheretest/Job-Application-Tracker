const User = require("../models/user");
const Application = require("../models/application");
const Company = require("../models/company");
const Interview = require("../models/interview");
const Reminder = require("../models/reminder");
const ApplicationDocument = require("../models/applicationDocument");
const SavedJob = require("../models/savedJob");

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

// User ↔ Reminder
User.hasMany(Reminder, {
  foreignKey: "userId",
  as: "reminders",
  onDelete: "CASCADE",
});

Reminder.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Application ↔ Reminder
Application.hasMany(Reminder, {
  foreignKey: "applicationId",
  as: "reminders",
  onDelete: "CASCADE",
});

Reminder.belongsTo(Application, {
  foreignKey: "applicationId",
  as: "application",
});

// Application ↔ ApplicationDocument
Application.hasMany(ApplicationDocument, {
  foreignKey: "applicationId",
  as: "documents",
  onDelete: "CASCADE",
});

ApplicationDocument.belongsTo(Application, {
  foreignKey: "applicationId",
  as: "application",
});

User.hasMany(SavedJob, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

SavedJob.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = {
  User,
  Application,
  Company,
  Interview,
  Reminder,
  ApplicationDocument,
  SavedJob,
};
