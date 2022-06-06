'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Product.belongsTo(models.SKU, { foreignKey: 'skuId' })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    brandId: DataTypes.INTEGER,
    spuSpec: DataTypes.STRING,
    skuId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    discountId: DataTypes.INTEGER,
    invemtory: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    underscored: true
  })
  return Product
}
