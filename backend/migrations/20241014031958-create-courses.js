"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Courses", {
      cr_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cr_name: {
        type: Sequelize.STRING,
      },
      cr_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cr_code: {
        type: Sequelize.STRING,
      },
      cr_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cr_desc: {
        type: Sequelize.TEXT,
        allowNull: false,
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
    await queryInterface.dropTable("Courses");
  },
};
