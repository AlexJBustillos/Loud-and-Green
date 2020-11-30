'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class strain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.strain.belongsToMany(models.user, { through: models.user_strain });
      models.strain.hasMany(models.review)
    }
  };
  strain.init({
    name: DataTypes.STRING,
    flavor: DataTypes.STRING,
    race: DataTypes.STRING,
    effect: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'strain',
  });
  return strain;
};