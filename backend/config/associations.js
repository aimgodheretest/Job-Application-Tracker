const User = require("../models/user");
const Application = require("../models/application");
const Company = require("../models/company");

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

module.exports = {
  User,
  Application,
  Company,
};
