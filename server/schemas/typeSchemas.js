import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

const Types = sequelize.define(
  "Types",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false, 
  }
);

export default Types;
