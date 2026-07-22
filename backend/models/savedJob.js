const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SavedJob = sequelize.define(
  "SavedJob",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    jobType: {
      type: DataTypes.ENUM(
        "Full-time",
        "Part-time",
        "Contract",
        "Internship",
        "Remote",
      ),
      allowNull: true,
    },

    salary: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    source: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    jobUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    deadline: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("Saved", "Applied", "Archived"),
      defaultValue: "Saved",
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = SavedJob;
