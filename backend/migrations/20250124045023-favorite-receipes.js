'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('favorite-receipe', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      receip_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      favorite_by: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add foreign key constraint
    await queryInterface.addConstraint('favorite-receipe', {
      fields: ['receip_id'],
      type: 'foreign key',
      name: 'fk_favorite_recipe_recipe',
      references: {
        table: 'create_receipe',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // First remove the foreign key constraint
    await queryInterface.removeConstraint(
      'favorite-receipe',
      'fk_favorite_recipe_recipe'
    );
    
    // Then drop the table
    await queryInterface.dropTable('favorite-receipe');
  }
};
