const { collectSeeder } = require("../data-fake");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Collects", collectSeeder, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Collects", null, {});
  },
};
