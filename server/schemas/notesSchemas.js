import { DataTypes, TEXT } from "sequelize";
import { sequelize } from "../database/db.js";
import Files from "./fileSchemas.js";

const Notes = sequelize.define("Notes", {
    fileName: {type: DataTypes.TEXT, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false }
}, {
    timestamps: true,
});
Notes.belongsTo(Files, { foreignKey: "fileId", onDelete: "CASCADE" });
Files.hasMany(Notes, { foreignKey: "fileId" });

export default Notes;