"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userCourses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userCourses.init(
    {
      uc_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uc_us_id: {
        type: DataTypes.INTEGER,
      },
      uc_cr_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "userCourses",
      timestamps: false,
    }
  );
  return userCourses;
};
