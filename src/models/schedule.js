import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Schedule = sequelize.define(
  "schedule",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Day: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "schedule",
    timestamps: false,
  }
);

export default Schedule;
