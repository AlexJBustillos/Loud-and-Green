'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_strain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_strain.init({
    userId: DataTypes.INTEGER,
    strainId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_strain',
  });
  return user_strain;
};