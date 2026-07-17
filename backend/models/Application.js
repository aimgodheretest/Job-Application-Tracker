const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Application = sequelize.define(
  "Application",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    jobType: {
      type: DataTypes.ENUM("Full-time", "Internship", "Part-time", "Contract"),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("Applied", "Interview", "Offer", "Rejected"),
      defaultValue: "Applied",
    },

    salary: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    appliedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    jobUrl: {
      type: DataTypes.STRING,
      allowNull: true,
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

module.exports = Application;
