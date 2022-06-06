'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories',
      [
        'Men fashion',
        'Women fashion',
        'Phones & Tablets',
        'Computer & Accessories',
        'Electronic Accessories',
        'Home & Living',
        'Health & Beauty',
        'Babies & Toys',
        'Sports & Outdoor',
        'Automotive'
      ]
        .map(item => {
          return {
            name: item,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
        ), {})
    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM Categories;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('Categories',
      [
        'Jackets & Hoodies',
        'Shirts',
        'Tees & Polos',
        'Panjabi',
        'Pants & Trousers',
        'Watches',
        'Sunglass & Eyewear',
        'Wallets & Belts',
        'Bags & Backpacks',
        'Footwear',
        'Accessories',
        'Inner wear'
      ]
        .map(item => {
          return {
            name: item,
            parent_id: categories[0].id,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
        ), {})
    await queryInterface.bulkInsert('Categories',
      [
        'Saree',
        'Hijabs',
        'Salwar kamix & Kurtis',
        'Footwear',
        'Bags & Clutches',
        'Backpacks',
        'Western',
        'Pants & Trousers',
        'Watches',
        'Jewellery',
        'Lingerie & Sleep wear',
        'Sunglass & Eyewear'
      ]
        .map(item => {
          return {
            name: item,
            parent_id: categories[1].id,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
        ), {})
    await queryInterface.bulkInsert('Categories',
      [
        'Phones',
        'GSM Phones',
        'Tablets',
        'Smart watch',
        'Bluetooth speakers',
        'Earphone & Headsets',
        'Power bank',
        'Chargers & Cables',
        'Mobiles accessories'
      ]
        .map(item => {
          return {
            name: item,
            parent_id: categories[2].id,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
        ), {})
    await queryInterface.bulkInsert('Categories',
      [
        'Laptops & Notebooks',
        'PC',
        'Monitor',
        'Keyboard & Mouse',
        'Router & Networking',
        'Storage',
        'Audio accessories',
        'Printers & Scanners',
        'Accessories',
        'Gamers',
        'Projector',
        'Components',
        'Software',
        'Power solution'
      ]
        .map(item => {
          return {
            name: item,
            parent_id: categories[3].id,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
        ), {})
    await queryInterface.bulkInsert('Categories',
      [
        'TV',
        'Kitchen appliances',
        'Small & Others appliances',
        'Cameras',
        'Hardware & Tools',
        'Air conditioner',
        'Refrigerator',
        'TV accessories',
        'Generators & IPS',
        'Washing machine'
      ]
        .map(item => {
          return {
            name: item,
            parent_id: categories[4].id,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
        ), {})
    await queryInterface.bulkInsert('Categories',
      [
        'Plastics',
        'Pans & Pots',
        'Kitchen accessories',
        'Curtains & Covers',
        'Bathroom accessories',
        'Home decor',
        'Cookware',
        'Travel accessories',
        'Groceries',
        'Bedding',
        'Storage & Organisations',
        'Ceramics',
        'Towels',
        'Dinning Utensils',
        'Others'
      ]
        .map(item => {
          return {
            name: item,
            parent_id: categories[5].id,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
        ), {})
    await queryInterface.bulkInsert('Categories',
      [
        'Perfume & Deodorant',
        'Makeup',
        'Grooming Products',
        'Personal care',
        'Body & Skin care',
        'Hair care',
        'Sports & Fitness',
        'Health care Devices',
        'Bath & Body'
      ]
        .map(item => {
          return {
            name: item,
            parent_id: categories[6].id,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
        ), {})
    await queryInterface.bulkInsert('Categories',
      [
        'Toys & Games',
        'Diaper & Wipes',
        'Babies accesories',
        'Clothing'
      ]
        .map(item => {
          return {
            name: item,
            parent_id: categories[7].id,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
        ), {})
    await queryInterface.bulkInsert('Categories',
      [
        'Exercise & Fitness',
        'Team Sports'
      ]
        .map(item => {
          return {
            name: item,
            parent_id: categories[8].id,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
        ), {})
    await queryInterface.bulkInsert('Categories',
      [
        'Motor Cycles',
        'Helmet',
        'Accesories'
      ]
        .map(item => {
          return {
            name: item,
            parent_id: categories[9].id,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
        ), {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
}
