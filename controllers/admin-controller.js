const { Product, SKU, Category, User } = require('../models')
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
  getProduct: async (req, res, next) => {
    try {
      const productId = req.params.id
      const product = await Product.findByPk(productId, {
        raw: true,
        nest: true,
        include: [SKU, {
          model: Category,
          include: {
            model: Category,
            as: 'parent',
            required: false
          }
        }]
      })
      return res.render('admin/product', { product })
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
  },
  getUsersPage: async (req, res, next) => {
    try {
      const users = await User.findAll({ raw: true })
      return res.render('admin/users', { users })
    } catch (error) {
      next(error)
    }
  },
  setAdmin: async (req, res, next) => {
    try {
      const userId = req.params.id
      const user = await User.findByPk(userId)
      if (!user) throw new Error('User is not exists')
      if (user.email === 'root@example.com') {
        req.flash('warning_msg', 'Cannot change root permission')
        return res.redirect('/admin/users')
      }
      await user.update({
        isAdmin: !user.isAdmin
      })
      req.flash('success_msg', 'Permission has been updated successfully')
      return res.redirect('/admin/users')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = adminController
