"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "headline", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Users", "experience", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Users", "location", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Users", "bio", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn("Users", "portfolio", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Users", "resume", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("Users", "headline");

    await queryInterface.removeColumn("Users", "experience");

    await queryInterface.removeColumn("Users", "location");

    await queryInterface.removeColumn("Users", "bio");

    await queryInterface.removeColumn("Users", "portfolio");

    await queryInterface.removeColumn("Users", "resume");
  },
};
