"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      us_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      us_fullname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      us_username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      us_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      us_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
