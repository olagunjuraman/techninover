"use strict";
import { DataTypes, Sequelize } from "sequelize";

module.exports = function (sequelize) {
  const Reminder = sequelize.define(
    "Reminder",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "reminders",
    }
  );

  return Reminder;
};
