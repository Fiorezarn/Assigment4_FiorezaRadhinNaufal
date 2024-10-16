"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "courses",
      [
        {
          cr_id: 1,
          cr_name: "Python",
          cr_code: "PY01",
          cr_price: 1000000,
          cr_desc:
            "Python is an interpreted high-level general-purpose programming language",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cr_id: 2,
          cr_name: "Typescript",
          cr_code: "TS01",
          cr_price: 1000000,
          cr_desc:
            "Typescript is a programming language developed by Microsoft",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cr_id: 3,
          cr_name: "Javascript",
          cr_code: "JS01",
          cr_price: 1000000,
          cr_desc: "Javascript is a programming language developed by Netscape",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("courses", null, {});
  },
};
