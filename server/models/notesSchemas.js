import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import User from "../models/userSchemas.js"; 

const Notes = sequelize.define("Notes", {
    content: { type: DataTypes.TEXT, allowNull: false }
}, {
    timestamps: true,
});
Notes.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Notes, { foreignKey: "userId" });

export default Notes;