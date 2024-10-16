"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CoursesSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CoursesSchedule.init(
    {
      cs_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cs_cr_id: {
        type: DataTypes.INTEGER,
      },
      cs_sc_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "CoursesSchedule",
      timestamps: false,
    }
  );
  return CoursesSchedule;
};
