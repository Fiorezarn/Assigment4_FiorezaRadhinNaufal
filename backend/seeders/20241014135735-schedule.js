"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "schedules",
      [
        {
          sc_id: 1,
          sc_date: new Date("2024-11-01 07:00:00"),
          sc_location: "Bandung",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sc_id: 2,
          sc_date: new Date("2024-12-01 07:00:00"),
          sc_location: "Surabaya",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sc_id: 3,
          sc_date: new Date("2024-12-01 07:00:00"),
          sc_location: "Jakarta",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("schedules", null, {});
  },
};
