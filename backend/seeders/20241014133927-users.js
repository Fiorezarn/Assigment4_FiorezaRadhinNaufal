"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          us_id: 1,
          us_fullname: "Fioreza Radhin Naufal",
          us_username: "fioreza",
          us_email: "fU6oG@example.com",
          us_password: await bcrypt.hashSync("fioreza", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
