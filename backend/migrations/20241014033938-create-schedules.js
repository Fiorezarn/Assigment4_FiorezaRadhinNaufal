"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Schedules", {
      sc_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sc_start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      sc_end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      sc_location: {
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
    await queryInterface.dropTable("Schedules");
  },
};
