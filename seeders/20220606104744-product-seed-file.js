'use strict'
const faker = require('@faker-js/faker').faker

module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM Categories;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const skus = await queryInterface.sequelize.query(
      'SELECT id FROM SKUs;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('Products',
      Array.from({ length: 200 }, () => ({
        name: faker.commerce.productName(),
        spu_spec: faker.lorem.sentence(10),
        category_id: categories[Math.floor(Math.random() * categories.length)].id,
        sku_id: skus[Math.floor(Math.random() * skus.length)].id,
        inventory: Math.floor(Math.random() * 300),
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {})
  }
}
