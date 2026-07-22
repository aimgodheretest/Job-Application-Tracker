"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("applicationDocuments", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      applicationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "applications",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      documentType: {
        type: Sequelize.ENUM("Resume", "Cover Letter", "Offer Letter", "Other"),
        allowNull: false,
      },

      originalName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      fileName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      filePath: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      mimeType: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      fileSize: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Add index for faster document lookup by application
    await queryInterface.addIndex("applicationDocuments", ["applicationId"]);
  },

  async down(queryInterface) {
    await queryInterface.removeIndex("applicationDocuments", ["applicationId"]);

    await queryInterface.dropTable("applicationDocuments");
  },
};
