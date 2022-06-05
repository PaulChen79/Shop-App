const productController = {
  getProducts: async (req, res, next) => {
    try {
      res.render('products')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = productController
