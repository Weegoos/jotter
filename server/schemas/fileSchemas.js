import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import User from "./userSchemas.js";

const Files = sequelize.define("Files", {
    name: { type: DataTypes.STRING, allowNull: false , unique: true},
    // type: { type: DataTypes.TEXT, allowNull: false, unique: true },
    // data: { type: DataTypes.BLOB("long"), allowNull: false }
}, {
    timestamps: true
});

Files.belongsTo(User,  {foreignKey: "userId", onDelete: "CASCADE"})
export default Files;