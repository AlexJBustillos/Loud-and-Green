'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.review.belongsTo(models.strain);
      models.review.belongsTo(models.user);
    }
  };
  review.init({
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    strainId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};