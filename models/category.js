'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Category.belongsTo(models.Category, {
        as: 'parent',
        foreignKey: 'parent_id',
        targetKey: 'id'
      })
      Category.hasMany(models.Category, {
        as: 'subCategories',
        foreignKey: 'parent_id'
      })
    }
  }
  Category.init({
    name: DataTypes.STRING,
    parentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Categories',
    underscored: true
  })
  return Category
}
