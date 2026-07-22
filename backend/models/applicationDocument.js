const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ApplicationDocument = sequelize.define(
  "ApplicationDocument",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    documentType: {
      type: DataTypes.ENUM("Resume", "Cover Letter", "Offer Letter", "Other"),
      allowNull: false,
    },

    originalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "applicationDocuments",
    timestamps: true,
  },
);

module.exports = ApplicationDocument;
