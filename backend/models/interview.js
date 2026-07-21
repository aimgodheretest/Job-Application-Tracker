const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Interview = sequelize.define(
  "Interview",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    round: {
      type: DataTypes.ENUM("HR", "Technical", "Managerial", "Final", "Other"),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    mode: {
      type: DataTypes.ENUM("Online", "Offline", "Phone"),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
    meetingLink: {
      type: DataTypes.STRING,
    },
    interviewer: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM(
        "Scheduled",
        "Completed",
        "Cancelled",
        "Rescheduled",
      ),
      defaultValue: "Scheduled",
    },
    feedback: {
      type: DataTypes.TEXT,
    },
    notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "interviews",
  },
);

module.exports = Interview;
