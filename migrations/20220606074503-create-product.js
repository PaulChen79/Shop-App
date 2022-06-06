'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      brand_id: {
        type: Sequelize.INTEGER
      },
      spu_spec: {
        type: Sequelize.STRING
      },
      sku_id: {
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      discount_id: {
        type: Sequelize.INTEGER
      },
      inventory: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Products')
  }
}
