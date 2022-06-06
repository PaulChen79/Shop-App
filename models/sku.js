'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class SKU extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  SKU.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SKU',
    tableName: 'SKUs',
    underscored: true
  })
  return SKU
}
