'use strict';
// const bcrypt = require("bcryptjs")
const { generatePassword } = require('../helpers/bcrypt.js')

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
    }
  };
  User.init({
    email: {
      type:DataTypes.STRING,
      validate:{
        isEmail:{
          args:true,
          msg:"Please insert the right format"
        },
        notEmpty:{
          args:true,
          msg:"Email cannot be empty"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:"Password cannot be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance,options)=>{
    instance.password= generatePassword(instance.password);
  })
  return User;
};