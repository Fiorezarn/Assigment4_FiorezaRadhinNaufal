"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Users.belongsToMany(models.Courses, {
        foreignKey: "uc_us_id",
        through: "userCourses",
        as: "Courses",
      });
    }
  }
  Users.init(
    {
      us_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      us_fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      us_username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      us_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      us_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
      timestamps: true,
    }
  );
  return Users;
};
