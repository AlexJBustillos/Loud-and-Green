'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class effect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.effect.belongsTo(models.strain);
    }
  };
  effect.init({
    strainId: DataTypes.INTEGER,
    effects: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'effect',
  });
  return effect;
};