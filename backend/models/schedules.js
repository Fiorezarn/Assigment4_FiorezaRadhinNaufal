"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Schedules.belongsToMany(models.Courses, {
        foreignKey: "cs_sc_id",
        through: "CoursesSchedule",
        as: "Courses",
      });
    }
  }
  Schedules.init(
    {
      sc_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sc_start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      sc_end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      sc_location: {
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
      modelName: "Schedules",
      timestamps: true,
    }
  );
  return Schedules;
};
