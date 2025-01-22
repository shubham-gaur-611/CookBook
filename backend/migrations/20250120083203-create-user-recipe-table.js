'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('create_receipe', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      receip_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      instructions: {
        type: Sequelize.STRING(1000),
        allowNull:false
      },
      ingredients: {
        type: Sequelize.STRING(1000),
        allowNull:false
      },
      receip_image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      posted_by: {
        type: Sequelize.STRING,
        allowNull:false
      },
      private_receipe: {
        type: Sequelize.STRING,
        allowNull:false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('create_receipe');
  }
};
