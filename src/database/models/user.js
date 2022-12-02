'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Rol,{
        as: 'rol',
        foreignKey: 'rolId'
      });
      User.hasMany(models.Address,{
        as: 'addresses',
        foreignKey: 'userId'
      });
      User.hasMany(models.Order,{
        as: 'orders',
        foreignKey: 'userId'
      })
    }
  }
  User.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: {
        type: DataTypes.STRING,
        defaultValue: "default-user.png"
      },
      rolId: DataTypes.INTEGER
    }, 
    {
      sequelize,
      modelName: 'User',
      paranoid:true
    }
  );
  return User;
};