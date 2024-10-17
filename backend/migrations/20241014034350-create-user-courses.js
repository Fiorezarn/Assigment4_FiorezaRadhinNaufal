"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("userCourses", {
      uc_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uc_us_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "us_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      uc_cr_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "courses",
          key: "cr_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("userCourses");
  },
};
