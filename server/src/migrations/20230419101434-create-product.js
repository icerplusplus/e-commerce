"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize, Deferrable) {
    await queryInterface.createTable("Products", {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false,
      },
      category_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      thumbnails: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      brand_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      short_description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      sale_price: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      discount_rate: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: 0,
      },
      root_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      quantity_sold: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      quantity_in_stock: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1000,
      },
      rating_average: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      review_count: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
