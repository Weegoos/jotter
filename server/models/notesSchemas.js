import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

const Notes = sequelize.define("Notes", {
    content: { type: DataTypes.TEXT, allowNull: false }
}, {
    timestamps: true,
});

export default Notes;