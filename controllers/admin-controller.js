const { Product, SKU, Category } = require('../models')
const adminController = {
  getProductsPage: async (req, res, next) => {
    try {
      let products = await Product.findAll({
        include: [
          SKU,
          {
            model: Category,
            include: {
              model: Category,
              as: 'subCategories',
              required: false
            }
          }
        ]
      })
      products = await products.map(product => product.toJSON())
      res.render('admin/products', { products })
    } catch (error) {
      next(error)
    }
  },
  getCategoriesPage: async (req, res, next) => {
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
      return res.render('admin/categories', { categories })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = adminController
