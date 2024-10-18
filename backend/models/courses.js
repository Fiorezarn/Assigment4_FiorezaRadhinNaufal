"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Courses.belongsToMany(models.Schedules, {
        foreignKey: "cs_cr_id",
        through: "CoursesSchedule",
        as: "Schedules",
      });

      models.Courses.belongsToMany(models.Users, {
        foreignKey: "uc_cr_id",
        through: "userCourses",
        as: "Users",
      });
    }
  }
  Courses.init(
    {
      cr_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cr_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      cr_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cr_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cr_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cr_desc: {
        type: DataTypes.TEXT,
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
      modelName: "Courses",
      timestamps: true,
    }
  );
  return Courses;
};
