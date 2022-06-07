const { Product, SKU, Category, User } = require('../models')
const { Op } = require('sequelize')

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
              as: 'parent',
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
  getCreateProductPage: async (req, res, next) => {
    try {
      let categories = await Category.findAll({
        include: {
          model: Category,
          as: 'parent',
          required: false
        },
        order: [['id', 'ASC']]
      })
      categories = await categories.map(category => category.toJSON())
      res.render('admin/create-product', { categories })
    } catch (error) {
      next(error)
    }
  },
  createProduct: async (req, res, next) => {
    try {
      const { name, categoryId, inventory, price, spuSpec, skuDesc } = req.body
      console.log(req.body)
      if (!name || !categoryId || !inventory || !price || !spuSpec || !skuDesc) {
        req.flash('warning_msg', 'All fields need to be filled')
        return res.redirect('back')
      }
      const sku = await SKU.create({ name, price, desc: skuDesc })
      await Product.create({ name, categoryId, inventory, spuSpec, skuId: sku.id })
      req.flash('success_msg', 'Product has created successfully.')
      res.redirect('/admin/products')
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
      if (!product) throw new Error('Product not exist.')
      return res.render('admin/product', { product })
    } catch (error) {
      next(error)
    }
  },
  getCategoriesPage: async (req, res, next) => {
    try {
      const categoryId = req.params.id
      const category = await Category.findByPk(categoryId, {
        raw: true,
        nest: true,
        include: {
          model: Category,
          as: 'parent',
          required: false
        }
      })
      let categories = await Category.findAll({
        include: {
          model: Category,
          as: 'parent',
          required: false
        }
      })
      const mainCategories = await Category.findAll({ raw: true, where: { parentId: null } })
      console.log(category)
      categories = await categories.map(category => category.toJSON())
      return res.render('admin/categories', { categories, category, mainCategories })
    } catch (error) {
      next(error)
    }
  },
  createCategory: async (req, res, next) => {
    try {
      const { name, subName } = req.body
      const category = await Category.findOne({
        where: {
          [Op.or]: [
            { name },
            { name: subName }
          ]
        }
      })
      if (category) {
        req.flash('warning_msg', 'Category already exist.')
        return res.redirect('/admin/categories')
      }
      if (subName) {
        const parent = await Category.create({ name })
        await Category.create({ name: subName, parentId: parent.id })
      } else {
        await Category.create({ name })
      }
      req.flash('success_msg', 'Category has created successfully')
      return res.redirect('/admin/categories')
    } catch (error) {
      next(error)
    }
  },
  editCategory: async (req, res, next) => {
    try {
      const id = req.params.id
      const { categoryId, subName } = req.body
      const category = await Category.findByPk(id)
      if (!category) throw new Error('Category not exist')
      await category.update({ name: subName, parentId: categoryId || null })
      req.flash('success_msg', 'Category has updated successfully.')
      res.redirect('/admin/categories')
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
  },
  getProductEditPage: async (req, res, next) => {
    try {
      const productId = req.params.id
      const product = await Product.findByPk(productId, {
        raw: true,
        nest: true,
        include: [SKU]
      })
      if (!product) throw new Error('Product not exist.')
      let categories = await Category.findAll({
        include: {
          model: Category,
          as: 'parent',
          required: false
        },
        order: [['id', 'ASC']]
      })
      categories = await categories.map(category => category.toJSON())
      return res.render('admin/edit-product', { product, categories })
    } catch (error) {
      next(error)
    }
  },
  editProduct: async (req, res, next) => {
    try {
      const productId = req.params.id
      const { name, categoryId, inventory, price, spuSpec, skuDesc } = req.body
      console.log(req.body)
      if (!name || !categoryId || !inventory || !price || !spuSpec || !skuDesc) {
        req.flash('warning_msg', 'All fields need to be filled')
        return res.redirect('back')
      }
      const product = await Product.findByPk(productId, {
        nest: true,
        include: [SKU, Category]
      })
      const sku = await SKU.findByPk(product.skuId)
      await product.update({ name, categoryId, inventory, spuSpec })
      await sku.update({ price, skuDesc })
      req.flash('success_msg', 'Product has updated successfully.')
      res.redirect('/admin/products')
    } catch (error) {
      next(error)
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const productId = req.params.id
      const product = await Product.findByPk(productId)
      if (!product) throw new Error('Product not exist.')
      await product.destroy()
      req.flash('success_msg', 'Product has deleted successfully.')
      res.redirect('/admin/products')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = adminController
