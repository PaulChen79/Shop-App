'use strict'
const faker = require('@faker-js/faker').faker

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SKUs',
      Array.from({ length: 40 }, () => ({
        name: faker.commerce.productMaterial(),
        image: `https://loremflickr.com/320/240/product/?random=${Math.random() * 100}`,
        price: faker.commerce.price(100, 200, 0),
        desc: faker.commerce.productDescription(),
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SKUs', null, {})
  }
}
