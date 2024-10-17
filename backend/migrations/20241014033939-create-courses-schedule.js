"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CoursesSchedules", {
      cs_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cs_cr_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Courses",
          key: "cr_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      cs_sc_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Schedules",
          key: "sc_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("CoursesSchedules");
  },
};
