"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "coursesschedules",
      [
        {
          cs_cr_id: 1,
          cs_sc_id: 1,
        },
        {
          cs_cr_id: 2,
          cs_sc_id: 2,
        },
        {
          cs_cr_id: 3,
          cs_sc_id: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("coursesschedules", null, {});
  },
};
