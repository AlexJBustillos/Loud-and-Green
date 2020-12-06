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
      models.strain.hasMany(models.review);
      models.strain.hasMany(models.effect);
      models.strain.hasMany(models.flavor);
    }
  };
  strain.init({
    strainId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    race: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'strain',
  });
  return strain;
};