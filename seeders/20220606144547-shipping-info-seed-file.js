'use strict'
const faker = require('@faker-js/faker').faker

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('ShippingInfos',
      Array.from({ length: 10 }, () => ({
        user_id: users[Math.floor(Math.random() * users.length)].id,
        contact_name: faker.name.findName(),
        contact_phone: faker.phone.phoneNumber(),
        address_line1: faker.address.streetAddress(true),
        address_line2: faker.address.secondaryAddress(),
        state: faker.address.state(),
        zipcode: faker.address.zipCode('#####'),
        city: faker.address.cityName(),
        country: faker.address.country(),
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ShippingInfos', null, {})
  }
}
