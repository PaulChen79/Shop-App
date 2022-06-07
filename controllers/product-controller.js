const { Category } = require('../models')

const productController = {
  getProducts: async (req, res, next) => {
    try {
      let categories = await Category.findAll({
        where: { parentId: null },
        include: {
          model: Category,
          as: 'subCategories',
          required: false
        }
      })
      categories = await categories.map(category => category.toJSON())
      res.render('products', { categories })
    } catch (error) {
      next(error)
    }
  },
  getAboutPage: (req, res, next) => {
    try {
      res.render('about')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = productController
