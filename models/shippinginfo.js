'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ShippingInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      ShippingInfo.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  ShippingInfo.init({
    userId: DataTypes.INTEGER,
    contactName: DataTypes.STRING,
    contactPhone: DataTypes.STRING,
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ShippingInfo',
    tableName: 'ShippingInfos',
    underscored: true
  })
  return ShippingInfo
}
