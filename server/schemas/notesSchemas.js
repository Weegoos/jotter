import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import Files from "./fileSchemas.js";

const Notes = sequelize.define(
  "Notes",
  {
    fileName: { type: DataTypes.TEXT, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    title: { type: DataTypes.TEXT, allowNull: false, unique: true },
    type: { type: DataTypes.TEXT, allowNull: false },
    pinned: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    password: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    hashtags: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    timestamps: true,
  },
);
Notes.belongsTo(Files, { foreignKey: "fileId", onDelete: "CASCADE" });
Files.hasMany(Notes, { foreignKey: "fileId" });

export default Notes;
