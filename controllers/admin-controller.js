const adminController = {
  getProductsPage: async (req, res, next) => {
    try {
      res.render('admin/products')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = adminController
